<?php
/* Cliente SMTP mínimo, sem dependências. Suporta SSL implícito (porta 465)
 * e STARTTLS (porta 587), com AUTH LOGIN. */

declare(strict_types=1);

function cab_utf8(string $s): string {
  return preg_match('/[^\x20-\x7E]/', $s) ? '=?UTF-8?B?' . base64_encode($s) . '?=' : $s;
}

function envia_email(array $cfg, string $para, array $cc, string $responderA, string $nomeCliente,
                     string $assunto, string $corpo, string $html = ''): void {
  $de     = $cfg['de'] ?? ($cfg['smtp_user'] ?? 'noreply@scooter-quad.com');
  $deNome = $cfg['de_nome'] ?? 'Site Scooter & Quad';

  $cab = [
    'Date: ' . date('r'),
    'From: ' . cab_utf8($deNome) . " <$de>",
    "To: <$para>",
  ];
  if ($cc) $cab[] = 'Cc: ' . implode(', ', array_map(fn($e) => "<$e>", $cc));
  $cab[] = 'Reply-To: ' . cab_utf8($nomeCliente) . " <$responderA>";
  $cab[] = 'Subject: ' . cab_utf8($assunto);
  $cab[] = 'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr($de, '@'), 1) . '>';
  $cab[] = 'MIME-Version: 1.0';
  $b64 = fn(string $t): string => rtrim(chunk_split(base64_encode($t), 76, "\r\n"));
  if ($html === '') {
    $cab[] = 'Content-Type: text/plain; charset=UTF-8';
    $cab[] = 'Content-Transfer-Encoding: base64';
    $mensagem = implode("\r\n", $cab) . "\r\n\r\n" . $b64($corpo);
  } else {
    /* texto simples + HTML no mesmo email: cada programa de email mostra o que souber */
    $lim = 'sq-' . bin2hex(random_bytes(12));
    $cab[] = 'Content-Type: multipart/alternative; boundary="' . $lim . '"';
    $parte = fn(string $tipo, string $t): string =>
      "--$lim\r\nContent-Type: $tipo; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . $b64($t) . "\r\n";
    $mensagem = implode("\r\n", $cab) . "\r\n\r\n"
      . $parte('text/plain', $corpo) . $parte('text/html', $html) . "--$lim--";
  }

  /* o servidor (Hetzner) tem as portas 25 e 465 bloqueadas: só SMTP autenticado na 587 */
  if (empty($cfg['smtp_host'])) throw new RuntimeException('smtp_host não configurado');

  $host = $cfg['smtp_host'];
  $porta = (int)($cfg['smtp_port'] ?? 587);
  $seguro = $cfg['smtp_secure'] ?? ($porta === 465 ? 'ssl' : 'tls');
  $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true, 'SNI_enabled' => true]]);
  $alvo = ($seguro === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $porta;
  $s = @stream_socket_client($alvo, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
  if (!$s) throw new RuntimeException("ligação SMTP falhou: $errstr ($errno)");
  stream_set_timeout($s, 20);

  $le = function () use ($s): array {
    $txt = '';
    while (($l = fgets($s, 1024)) !== false) {
      $txt .= $l;
      if (strlen($l) < 4 || $l[3] === ' ') break;
    }
    return [(int)substr($txt, 0, 3), $txt];
  };
  $cmd = function (string $c, array $esperado) use ($s, $le): string {
    fwrite($s, $c . "\r\n");
    [$cod, $txt] = $le();
    if (!in_array($cod, $esperado, true)) {
      $mostra = preg_match('/^(AUTH|[A-Za-z0-9+\/=]{8,}$)/', $c) ? '[credenciais]' : $c;
      throw new RuntimeException("SMTP '$mostra' respondeu: " . trim($txt));
    }
    return $txt;
  };

  [$cod, $txt] = $le();
  if ($cod !== 220) throw new RuntimeException('SMTP saudação: ' . trim($txt));
  $eu = gethostname() ?: 'localhost';
  $cmd("EHLO $eu", [250]);
  if ($seguro === 'tls') {
    $cmd('STARTTLS', [220]);
    if (!stream_socket_enable_crypto($s, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
      throw new RuntimeException('STARTTLS falhou');
    }
    $cmd("EHLO $eu", [250]);
  }
  if (!empty($cfg['smtp_user'])) {
    $cmd('AUTH LOGIN', [334]);
    $cmd(base64_encode($cfg['smtp_user']), [334]);
    $cmd(base64_encode($cfg['smtp_pass'] ?? ''), [235]);
  }
  $cmd("MAIL FROM:<$de>", [250]);
  foreach (array_merge([$para], $cc) as $r) $cmd("RCPT TO:<$r>", [250, 251]);
  $cmd('DATA', [354]);
  $cmd($mensagem . "\r\n.", [250]);
  @fwrite($s, "QUIT\r\n");
  fclose($s);
}
