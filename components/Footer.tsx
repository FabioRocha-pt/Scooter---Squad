import Link from 'next/link';
import LogoMark from './LogoMark';
import { CONTACT_EMAIL, WHATSAPP } from '@/lib/catalog';

export default function Footer() {
  return (
    <footer
      id="contactos"
      className="mt-20 rounded-t-[34px] bg-ink pb-6 pt-12 text-[#C4CBD4]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <LogoMark className="mb-3 h-10 w-auto" />
            <p className="text-sm">
              Aluguer e venda de scooters e quads, e excursões guiadas em Cabo
              Verde desde 2022.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-sun">
              Contactos
            </h4>
            <ul className="grid gap-2 text-sm">
              {WHATSAPP.map((w) => (
                <li key={w.number}>
                  <a
                    href={`https://wa.me/${w.number}`}
                    className="transition-colors hover:text-brand"
                  >
                    ✆ WhatsApp {w.label} {w.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-brand"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-sun">
              Loja
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/loja" className="transition-colors hover:text-brand">
                  Catálogo completo
                </Link>
              </li>
              <li>
                <Link href="/#reservar" className="transition-colors hover:text-brand">
                  Reservar aluguer
                </Link>
              </li>
              <li>
                <Link href="/#experiencias" className="transition-colors hover:text-brand">
                  Excursões
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-5 text-xs text-[#8A93A0]">
          <span>© 2026 Scooter &amp; Quad — Cabo Verde</span>
          <span>Km 0 · Garantia 12 meses · Envio para todas as ilhas</span>
        </div>
      </div>
    </footer>
  );
}
