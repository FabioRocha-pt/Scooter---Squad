# Scooter & Quad — Web App

Site em **Next.js 15 (App Router) + React 19 + Tailwind CSS v4**, seguindo o design glass claro (laranja/amarelo) dos protótipos HTML.

## Arranque

```bash
npm install
npm run dev
```

## Fluxo do site

| Rota | Página | Origem (protótipo) |
| --- | --- | --- |
| `/` | Homepage: hero + pesquisa de reserva, experiências, frota, comprar | `scooter-quad-glass.html` |
| `/loja` | Catálogo com filtros (scooter/quad · novo/usado) e promoção | `scooter-quad-loja.html` |
| `/produto/[slug]` | Página de produto: galeria, cores, entrega, financiamento | `scooter-quad-produto.html` |
| `/contacto` | Pedido (compra/orçamento/ficha/financiamento/reserva) | `scooter-quad-contacto.html` |

**Como funciona o pedido:** a pesquisa do hero e os botões de compra encaminham para `/contacto` com a informação pré-preenchida. Ao enviar, o pedido é registado na fila (visível no backoffice) e abre-se o email do cliente já composto para **fapiyou@gmail.com** com todos os dados da reserva/compra (`mailto:` — não precisa de servidor de email).

Os produtos da loja vivem em `lib/catalog.ts`; a frota de aluguer em `lib/vehicles.ts`.

## Área reservada (dark)

- `/login` — Supabase Auth (chaves em `.env`).
- `/conta` — reservas do utilizador + pedido de contacto por reserva.
- `/backoffice` — gestor de reservas e pedidos de contacto, só para os emails em `NEXT_PUBLIC_ADMIN_EMAILS`.
- **Dados**: `lib/reservations.ts` tenta as tabelas Supabase (`reservas`, `pedidos_contacto`) e cai para localStorage se não existirem (badge "Demo local" no backoffice). Para multi-utilizador real, corre `supabase/schema.sql` uma vez no SQL Editor do Supabase.
