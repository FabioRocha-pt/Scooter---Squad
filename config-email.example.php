<?php
/* Copiar para o servidor como:
 *   /var/www/vhosts/scooterquad.duckdns.org/private/scooter-email.php
 * (pasta "private" do domínio no Plesk, fora da raiz pública e fora do git).
 * Nunca pôr este ficheiro com a password real no repositório. */
return [
  /* caixas que recebem os pedidos */
  'mindelo' => 'reservas.mindelo@scooter-quad.com',   // São Vicente
  'praia'   => 'reservas.praia@scooter-quad.com',     // Santiago
  'admin'   => 'admin@scooter-quad.com',              // recebe todos, em Cc

  /* conta que envia (Aruba). O servidor Hetzner bloqueia as portas 25 e 465: usar 587. */
  'de'          => 'noreply@scooter-quad.com',
  'de_nome'     => 'Site Scooter & Quad',
  'smtp_host'   => 'smtps.aruba.it',
  'smtp_port'   => 587,                 // STARTTLS (465 está bloqueada na Hetzner)
  'smtp_user'   => 'noreply@scooter-quad.com',
  'smtp_pass'   => 'COLOCAR_AQUI',

  /* em testes: tudo vai para este endereço, com o destino real no assunto.
     Deixar vazio ('') para o funcionamento normal. */
  'teste_para'  => '',
];
