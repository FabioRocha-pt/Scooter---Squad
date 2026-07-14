'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface RentalRange {
  start: Date | null;
  end: Date | null;
  startTime: string;
  endTime: string;
}

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (range: RentalRange) => void;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

function buildMonth(year: number, month: number): (Date | null)[] {
  const offset = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1)),
  ];
}

const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.toDateString() === b.toDateString();

const fmtLong = (d: Date | null) =>
  d
    ? d.toLocaleDateString('pt-PT', {
        weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
      })
    : '—';

/* ---------- Sub-componentes ---------- */

interface MonthGridProps {
  year: number;
  month: number;
  start: Date | null;
  end: Date | null;
  onPick: (d: Date) => void;
}

function MonthGrid({ year, month, start, end, onPick }: MonthGridProps) {
  const cells = useMemo(() => buildMonth(year, month), [year, month]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex-1">
      <p className="mb-3 text-center font-display text-lg font-bold uppercase tracking-widest">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="pb-1 text-[11px] font-semibold uppercase text-fog">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`empty-${i}`} />;
          const past = d < today;
          const isEdge = sameDay(d, start) || sameDay(d, end);
          const inRange = !!start && !!end && d > start && d < end;
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={past}
              onClick={() => onPick(d)}
              className={[
                'mx-auto grid h-9 w-9 place-items-center rounded-lg text-sm transition-colors',
                past && 'cursor-not-allowed text-fog/30',
                !past && !isEdge && !inRange && 'text-zinc-200 hover:bg-white/10',
                inRange && 'rounded-none bg-neon/15 text-neon',
                isEdge && 'bg-neon font-bold text-night neon-glow',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TimeFieldProps {
  label: string;
  dateLabel: string;
  hour: string;
  minute: string;
  meridiem: 'AM' | 'PM';
  onChange: (h: string, m: string, mer: 'AM' | 'PM') => void;
}

function TimeField({ label, dateLabel, hour, minute, meridiem, onChange }: TimeFieldProps) {
  const selectCls =
    'rounded-lg border border-line bg-mist px-3 py-2 text-sm font-semibold outline-none transition-colors focus:border-neon';
  return (
    <div className="flex-1">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-fog">{label}</p>
      <p className="mb-2 text-sm font-semibold capitalize">{dateLabel}</p>
      <div className="flex items-center gap-2">
        <select value={hour} onChange={(e) => onChange(e.target.value, minute, meridiem)} className={selectCls} aria-label={`${label} — hora`}>
          {HOURS.map((h) => <option key={h}>{h}</option>)}
        </select>
        <select value={minute} onChange={(e) => onChange(hour, e.target.value, meridiem)} className={selectCls} aria-label={`${label} — minutos`}>
          {MINUTES.map((m) => <option key={m}>{m}</option>)}
        </select>
        {(['AM', 'PM'] as const).map((mer) => (
          <button
            key={mer}
            type="button"
            onClick={() => onChange(hour, minute, mer)}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
              meridiem === mer
                ? 'bg-neon text-night neon-glow'
                : 'border border-line bg-mist text-fog hover:text-white'
            }`}
          >
            {mer}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */

export default function DatePickerModal({ open, onClose, onApply }: DatePickerModalProps) {
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [startT, setStartT] = useState({ h: '09', m: '00', mer: 'AM' as 'AM' | 'PM' });
  const [endT, setEndT] = useState({ h: '06', m: '00', mer: 'PM' as 'AM' | 'PM' });

  const next = cursor.month === 11
    ? { year: cursor.year + 1, month: 0 }
    : { year: cursor.year, month: cursor.month + 1 };

  const shift = (dir: -1 | 1) =>
    setCursor(({ year, month }) => {
      const m = month + dir;
      if (m < 0) return { year: year - 1, month: 11 };
      if (m > 11) return { year: year + 1, month: 0 };
      return { year, month: m };
    });

  const pick = (d: Date) => {
    if (!start || (start && end)) {
      setStart(d);
      setEnd(null);
      return;
    }
    if (d < start) setStart(d);
    else setEnd(d);
  };

  const apply = () => {
    onApply({
      start,
      end,
      startTime: `${startT.h}:${startT.m} ${startT.mer}`,
      endTime: `${endT.h}:${endT.m} ${endT.mer}`,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="datepicker"
          role="dialog"
          aria-label="Escolher datas de levantamento e devolução"
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="absolute inset-x-0 top-[calc(100%+12px)] z-50 origin-top rounded-3xl border border-line bg-carbon/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl md:left-auto md:right-0 md:w-[640px]"
        >
          {/* Navegação de meses */}
          <button type="button" onClick={() => shift(-1)} aria-label="Mês anterior"
            className="absolute left-4 top-6 grid h-8 w-8 place-items-center rounded-lg border border-line text-fog transition-colors hover:border-neon hover:text-neon">
            ‹
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="Mês seguinte"
            className="absolute right-4 top-6 grid h-8 w-8 place-items-center rounded-lg border border-line text-fog transition-colors hover:border-neon hover:text-neon">
            ›
          </button>

          {/* Dois meses lado a lado */}
          <div className="flex flex-col gap-8 md:flex-row">
            <MonthGrid {...cursor} start={start} end={end} onPick={pick} />
            <MonthGrid {...next} start={start} end={end} onPick={pick} />
          </div>

          {/* Horas de levantamento / devolução */}
          <div className="mt-6 flex flex-col gap-6 border-t border-line pt-5 md:flex-row">
            <TimeField
              label="Início"
              dateLabel={fmtLong(start)}
              hour={startT.h} minute={startT.m} meridiem={startT.mer}
              onChange={(h, m, mer) => setStartT({ h, m, mer })}
            />
            <TimeField
              label="Fim"
              dateLabel={fmtLong(end)}
              hour={endT.h} minute={endT.m} meridiem={endT.mer}
              onChange={(h, m, mer) => setEndT({ h, m, mer })}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-fog transition-colors hover:text-white">
              Cancelar
            </button>
            <motion.button
              type="button"
              onClick={apply}
              disabled={!start || !end}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-neon px-7 py-2.5 text-sm font-bold text-night neon-glow disabled:opacity-40 disabled:shadow-none"
            >
              Confirmar datas
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
