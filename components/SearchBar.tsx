'use client';

import { motion } from 'framer-motion';

interface SearchBarProps {
  dateLabel: string;
  pickerOpen: boolean;
  onToggleDates: () => void;
}

const LOCATIONS = [
  'Praia (Santiago)',
  'Mindelo (São Vicente)',
  'Sal Rei (Boa Vista)',
];

export default function SearchBar({
  dateLabel,
  pickerOpen,
  onToggleDates,
}: SearchBarProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      onSubmit={(e) => {
        e.preventDefault();
        document
          .getElementById('favoritos')
          ?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="flex items-center gap-1 rounded-full bg-white p-1.5 pl-4 text-night shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
    >
      {/* Localização */}
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <svg className="shrink-0 text-neon-dim" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <select
          aria-label="Localização"
          className="w-full truncate bg-transparent text-sm font-semibold outline-none"
        >
          {LOCATIONS.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <span className="mx-2 h-7 w-px bg-night/10" />

      {/* Datas — abre o DatePickerModal */}
      <button
        type="button"
        onClick={onToggleDates}
        className="flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-night/5"
      >
        <svg className="text-neon-dim" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        {dateLabel}
        <motion.svg
          animate={{ rotate: pickerOpen ? 180 : 0 }}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      {/* Pesquisar */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Pesquisar disponibilidade"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neon text-night neon-glow"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </motion.button>
    </motion.form>
  );
}
