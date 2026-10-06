# Testes

Validação automática do site. Não existe browser no ambiente, por isso os testes
usam jsdom (executa as páginas) e postcss (simula a cascata do CSS).

## Preparação, uma vez

```bash
npm install jsdom postcss
```

## Correr

```bash
node teste.js   # páginas, FAQ, formulário, idiomas, links, ícones
node resp.js    # responsividade: colunas de cada componente em 8 larguras
node final.js   # travessões no texto, caixa de opções, dropdown, checkbox
```

Correr os três depois de qualquer alteração ao site.
A verificação visual continua a ter de ser feita por uma pessoa, em telemóvel e computador.
