<?php
/* Versão HTML do email de pedido, na linha visual do site (laranja, amarelo, escuro).
 * Só tabelas e estilos em linha, para funcionar no Gmail, Outlook e telemóveis.
 * A versão em texto simples continua a seguir no mesmo email, como alternativa. */

declare(strict_types=1);

function email_html(array $o): string {
  $e = fn($v): string => htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

  $ref   = $e($o['ref'] ?? '');
  $tipo  = $e($o['tipo'] ?? 'Pedido');
  $ilha  = $e($o['ilha'] ?? '');
  $nome  = $e($o['nome'] ?? '');
  $tel   = (string)($o['tel'] ?? '');
  $email = (string)($o['email'] ?? '');
  $host  = $e($o['host'] ?? 'www.scooter-quad.com');
  $quando = $e($o['quando'] ?? date('d/m/Y H:i'));
  $base  = rtrim((string)($o['base'] ?? 'https://www.scooter-quad.com'), '/');
  $logo  = $e($base . '/img/logo-scooter-quad-branco.png');

  $titulos = "font-family:'Barlow Condensed','Arial Narrow',Arial,sans-serif;text-transform:uppercase;";
  $texto   = "font-family:Inter,'Segoe UI',Helvetica,Arial,sans-serif;";

  /* linhas do pedido */
  $linhas = '';
  foreach (($o['linhas'] ?? []) as $l) {
    [$k, $v] = [$l[0] ?? '', $l[1] ?? ''];
    if ($k === '' || $v === '') continue;
    if ($v === $email && filter_var($v, FILTER_VALIDATE_EMAIL)) {
      $valor = '<a href="mailto:' . $e($v) . '" style="color:#E25200;text-decoration:none">' . $e($v) . '</a>';
    } elseif ($v === $tel) {
      $valor = '<a href="tel:' . $e(preg_replace('/[^0-9+]/', '', $v)) . '" style="color:#E25200;text-decoration:none">' . $e($v) . '</a>';
    } else {
      $valor = nl2br($e($v), false);
    }
    $linhas .= '<tr>'
      . '<td valign="top" width="34%" style="padding:11px 12px 11px 0;border-bottom:1px solid #E9ECF0;' . $titulos
      . 'font-size:13px;font-weight:700;letter-spacing:1.5px;color:#5B6673;line-height:20px">' . $e($k) . '</td>'
      . '<td valign="top" style="padding:11px 0;border-bottom:1px solid #E9ECF0;' . $texto
      . 'font-size:15px;font-weight:600;color:#12161D;line-height:22px">' . $valor . '</td>'
      . '</tr>';
  }

  /* botões: responder, WhatsApp (só com indicativo internacional) e ligar */
  $botao = function (string $href, string $rotulo, string $fundo, string $cor) use ($e, $titulos): string {
    return '<td style="padding:0 8px 8px 0"><a href="' . $e($href) . '" style="display:inline-block;background:' . $fundo
      . ';color:' . $cor . ';' . $titulos . 'font-size:16px;font-weight:700;letter-spacing:1.2px;text-decoration:none;'
      . 'padding:12px 22px;border-radius:12px">' . $rotulo . '</a></td>';
  };
  $botoes = '';
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $assunto = rawurlencode('Re: [' . ($o['ref'] ?? '') . '] ' . ($o['tipo'] ?? '') . ' · ' . ($o['ilha'] ?? ''));
    $botoes .= $botao('mailto:' . $email . '?subject=' . $assunto, 'Responder ao cliente', '#FF6B1A', '#FFFFFF');
  }
  $numeros = preg_replace('/\D/', '', $tel) ?? '';
  $internacional = (bool)preg_match('/^\s*(\+|00)/', $tel);
  if ($internacional && strlen($numeros) >= 8) {
    $botoes .= $botao('https://wa.me/' . ltrim(preg_replace('/^00/', '', $numeros) ?? '', '0'), 'WhatsApp', '#FFC93C', '#12161D');
  }
  if (strlen($numeros) >= 6) {
    $botoes .= $botao('tel:' . ($internacional ? '+' . preg_replace('/^00/', '', $numeros) : $numeros), 'Ligar', '#F6F7F9', '#12161D');
  }

  /* Modo escuro do Gmail no telemóvel: inverte as cores e o cabeçalho escuro ficava branco
   * (o logótipo branco desaparecia). Duas defesas:
   *  1. o fundo escuro vai também como imagem (gradiente de uma só cor), que o Gmail não inverte;
   *  2. o texto branco sobre esse fundo vai dentro de .gm-s/.gm-d, que o repõem a branco. */
  $escuro = 'background-color:#12161D;background-image:linear-gradient(#12161D,#12161D);';
  $claro  = fn(string $t): string => '<div class="gm-s"><div class="gm-d">' . $t . '</div></div>';

  return '<!doctype html><html lang="pt"><head><meta charset="utf-8">'
    . '<meta name="viewport" content="width=device-width, initial-scale=1">'
    . '<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">'
    . '<title>' . $ref . '</title>'
    . '<style>:root{color-scheme:light only}'
    . 'u + .body .gm-s{background:#000;mix-blend-mode:screen}'
    . 'u + .body .gm-d{background:#000;mix-blend-mode:difference}</style></head>'
    . '<body class="body" style="margin:0;padding:0;background:#F6F7F9">'
    . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F6F7F9">'
    . $tipo . ' · ' . $ilha . ' · ' . $nome . '</div>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F6F7F9">'
    . '<tr><td align="center" style="padding:24px 12px">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">'

    /* cabeçalho escuro com o logótipo */
    . '<tr><td bgcolor="#12161D" style="' . $escuro . 'border-radius:18px 18px 0 0;padding:22px 28px">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
    . '<td valign="middle"><img src="' . $logo . '" width="120" alt="Scooter &amp; Quad" '
    . 'style="display:block;width:120px;height:auto;border:0;color:#FFFFFF;' . $titulos . 'font-size:22px;font-weight:800"></td>'
    . '<td valign="middle" align="right" style="' . $titulos . 'font-size:13px;font-weight:700;letter-spacing:2.5px;color:#FFFFFF">'
    . $claro('Novo pedido do site') . '</td>'
    . '</tr></table></td></tr>'
    . '<tr><td bgcolor="#FF6B1A" style="background:#FF6B1A;height:5px;line-height:5px;font-size:0">&nbsp;</td></tr>'

    /* corpo */
    . '<tr><td bgcolor="#FFFFFF" style="background:#FFFFFF;padding:30px 28px 8px">'
    . '<div style="' . $titulos . 'font-size:13px;font-weight:700;letter-spacing:3px;color:#FF6B1A">' . $ilha . '</div>'
    . '<div style="' . $titulos . 'font-size:36px;font-weight:800;line-height:38px;color:#12161D;margin-top:6px">' . $tipo . '</div>'
    . '<div style="width:74px;height:6px;background:#FFC93C;border-radius:4px;margin-top:16px;line-height:6px;font-size:0">&nbsp;</div>'
    . '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px"><tr>'
    . '<td bgcolor="#FFF1E8" style="background:#FFF1E8;border-radius:10px;padding:7px 14px;' . $titulos
    . 'font-size:16px;font-weight:700;letter-spacing:1.5px;color:#E25200">Ref. ' . $ref . '</td>'
    . '</tr></table>'
    . '</td></tr>'

    . '<tr><td bgcolor="#FFFFFF" style="background:#FFFFFF;padding:14px 28px 6px">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' . $linhas . '</table>'
    . '</td></tr>'

    . ($botoes === '' ? '' :
        '<tr><td bgcolor="#FFFFFF" style="background:#FFFFFF;padding:22px 28px 22px">'
      . '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>' . $botoes . '</tr></table>'
      . '</td></tr>')

    /* rodapé */
    . '<tr><td bgcolor="#12161D" style="' . $escuro . 'border-radius:0 0 18px 18px;padding:18px 28px;' . $texto
    . 'font-size:12px;line-height:19px;color:#FFFFFF">'
    . $claro('Enviado pelo formulário de <b>' . $host . '</b> em ' . $quando . '.<br>'
           . 'Responder a este email responde diretamente ao cliente.')
    . '</td></tr>'

    . '</table></td></tr></table></body></html>';
}
