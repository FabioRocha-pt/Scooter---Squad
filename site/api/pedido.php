<?php
/* Scooter & Quad · envio dos pedidos do formulário (pedido.html)
 *
 * Recebe o pedido em JSON, gera a referência e envia um email:
 *   Para: a caixa da ilha (Mindelo ou Praia)
 *   Cc:   o admin, que recebe todos os pedidos
 *   Responder a: o email do cliente
 *
 * As credenciais NÃO estão no git. Ficam em
 *   /var/www/vhosts/<dominio>/private/scooter-email.php
 * (pasta "private" do Plesk, fora da raiz pública). Ver config-email.example.php
 * na raiz do repositório.
 */

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function responde(int $codigo, array $dados): void {
  http_response_code($codigo);
  echo json_encode($dados, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') responde(405, ['ok' => false, 'erro' => 'metodo']);

/* ---------- configuração ---------- */
$PRIVADO = dirname(__DIR__, 3) . '/private';
$ficheiroCfg = $PRIVADO . '/scooter-email.php';
if (!is_file($ficheiroCfg)) responde(503, ['ok' => false, 'erro' => 'config']);
$CFG = require $ficheiroCfg;

$dest = [
  'mindelo' => $CFG['mindelo'] ?? 'reservas.mindelo@scooter-quad.com',
  'praia'   => $CFG['praia']   ?? 'reservas.praia@scooter-quad.com',
  'admin'   => $CFG['admin']   ?? '',
];

/* ---------- ler e validar ---------- */
$bruto = file_get_contents('php://input', false, null, 0, 20000);
$d = json_decode((string)$bruto, true);
if (!is_array($d)) responde(400, ['ok' => false, 'erro' => 'json']);

/* armadilha para robôs: campo escondido que uma pessoa nunca preenche */
if (!empty($d['website'])) responde(200, ['ok' => true, 'ref' => 'SQ-' . date('Y') . '-0000']);

$limpa = function ($v, int $max = 300): string {
  $v = is_scalar($v) ? (string)$v : '';
  $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
  return trim(mb_substr($v, 0, $max));
};
$umaLinha = fn($v, int $max = 200) => preg_replace('/[\r\n]+/', ' ', $limpa($v, $max)) ?? '';

$nome  = $umaLinha($d['nome'] ?? '', 120);
$tel   = $umaLinha($d['tel'] ?? '', 40);
$email = $umaLinha($d['email'] ?? '', 160);
$ilha  = $umaLinha($d['ilha'] ?? '', 80);
$tipo  = $umaLinha($d['tipo'] ?? '', 80);

if ($nome === '' || $tel === '' || $ilha === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  responde(422, ['ok' => false, 'erro' => 'campos']);
}

/* ---------- verificação humana (Google reCAPTCHA v2) ----------
 * Só está ativa quando existe 'recaptcha_secret' na configuração privada.
 * Recusa quando a Google diz que a confirmação não é válida. Se a Google
 * não responder, o pedido passa (com registo): não se perdem reservas por uma avaria. */
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
$segredo = (string)($CFG['recaptcha_secret'] ?? '');
if ($segredo !== '') {
  $token = is_string($d['humano'] ?? null) ? substr($d['humano'], 0, 2100) : '';
  if ($token === '') responde(403, ['ok' => false, 'erro' => 'humano']);
  $ctx = stream_context_create(['http' => [
    'method' => 'POST', 'timeout' => 8, 'ignore_errors' => true,
    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
    'content' => http_build_query(['secret' => $segredo, 'response' => $token, 'remoteip' => $ip]),
  ]]);
  $resp = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $ctx);
  $v = is_string($resp) ? json_decode($resp, true) : null;
  if (!is_array($v) || !array_key_exists('success', $v)) {
    error_log('[scooter-quad pedido] reCAPTCHA sem resposta, pedido aceite sem verificação');
  } elseif ($v['success'] !== true) {
    responde(403, ['ok' => false, 'erro' => 'humano']);
  }
}

/* linhas do pedido já com as etiquetas no idioma do cliente: [[etiqueta, valor], ...] */
$linhas = [];
foreach (array_slice(is_array($d['linhas'] ?? null) ? $d['linhas'] : [], 0, 20) as $l) {
  if (!is_array($l) || count($l) < 2) continue;
  $k = $umaLinha($l[0], 60); $v = $limpa($l[1], 2000);
  if ($k !== '' && $v !== '') $linhas[] = [$k, $v];
}

/* ---------- limite simples por IP: 8 pedidos por 10 minutos ---------- */
@mkdir($PRIVADO . '/pedidos', 0750, true);
$fIp = $PRIVADO . '/pedidos/ip-' . hash('sha256', $ip . date('YmdH') . floor((int)date('i') / 10)) . '.txt';
$n = (int)@file_get_contents($fIp);
if ($n >= 8) responde(429, ['ok' => false, 'erro' => 'limite']);
@file_put_contents($fIp, (string)($n + 1));
foreach (glob($PRIVADO . '/pedidos/ip-*.txt') ?: [] as $f) if (filemtime($f) < time() - 3600) @unlink($f);

/* ---------- referência sequencial por ano (SQ-2026-0001) ---------- */
$fRef = $PRIVADO . '/pedidos/contador-' . date('Y') . '.txt';
$h = fopen($fRef, 'c+');
if (!$h || !flock($h, LOCK_EX)) responde(500, ['ok' => false, 'erro' => 'contador']);
$num = (int)stream_get_contents($h) + 1;
ftruncate($h, 0); rewind($h); fwrite($h, (string)$num); fflush($h);
flock($h, LOCK_UN); fclose($h);
$ref = 'SQ-' . date('Y') . '-' . str_pad((string)$num, 4, '0', STR_PAD_LEFT);

/* ---------- destino pela ilha ---------- */
$daPraia = (bool)preg_match('/santiago|praia/i', $ilha);
$para = $daPraia ? $dest['praia'] : $dest['mindelo'];
$cc = $dest['admin'] && strcasecmp($dest['admin'], $para) !== 0 ? [$dest['admin']] : [];

/* em testes: tudo para um só endereço, com o destino real indicado no assunto */
$testePara = $CFG['teste_para'] ?? '';
$assunto = "[$ref] $tipo · $ilha";
if ($testePara) {
  $assunto = '[TESTE → ' . $para . ($cc ? ' + cc ' . implode(', ', $cc) : '') . '] ' . $assunto;
  $para = $testePara; $cc = [];
}

$corpo = "Ref: $ref\n";
foreach ($linhas as [$k, $v]) $corpo .= "$k: $v\n";
$corpo .= "\n--\nEnviado pelo formulário de " . ($_SERVER['HTTP_HOST'] ?? 'scooter-quad.com')
        . ' em ' . date('d/m/Y H:i') . "\nResponder a este email responde diretamente ao cliente.\n";

/* registo local de cada pedido (fica na pasta privada, fora do site) */
@file_put_contents($PRIVADO . '/pedidos/pedidos-' . date('Y-m') . '.log',
  json_encode(['ref' => $ref, 'quando' => date('c'), 'para' => $para, 'cc' => $cc,
               'nome' => $nome, 'email' => $email, 'tel' => $tel, 'ilha' => $ilha,
               'linhas' => $linhas], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

/* ---------- envio ---------- */
require __DIR__ . '/smtp.php';
require __DIR__ . '/email-html.php';
try {
  /* 'email_html' => false na configuração privada volta ao email só de texto */
  $html = !($CFG['email_html'] ?? true) ? '' : email_html(['ref' => $ref, 'tipo' => $tipo, 'ilha' => $ilha, 'nome' => $nome, 'tel' => $tel,
                      'email' => $email, 'linhas' => $linhas, 'quando' => date('d/m/Y H:i'),
                      'host' => $_SERVER['HTTP_HOST'] ?? 'www.scooter-quad.com',
                      'base' => $CFG['site_url'] ?? 'https://www.scooter-quad.com']);
  envia_email($CFG, $para, $cc, $email, $nome, $assunto, $corpo, $html);
} catch (Throwable $e) {
  error_log('[scooter-quad pedido ' . $ref . '] ' . $e->getMessage());
  responde(502, ['ok' => false, 'erro' => 'envio', 'ref' => $ref]);
}

responde(200, ['ok' => true, 'ref' => $ref]);
