"use client";

import { useMemo, useState } from "react";

type Range = "week" | "months" | "years";
type DailyValues = Record<string, number>;

interface MetricsChartsProps {
  androidByDay: DailyValues;
  windowsSnapshots: DailyValues;
}

interface ChartPoint {
  label: string;
  value: number | null;
}

const numberFormat = new Intl.NumberFormat("es-AR");

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makePoints(range: Range, daily: DailyValues): ChartPoint[] {
  const today = new Date();
  const values = new Map<string, number | null>();

  if (range === "week") {
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
      const key = localDateKey(date);
      values.set(key, daily[key] ?? 0);
    }

    return [...values].map(([key, value]) => ({ label: key.slice(8), value }));
  }

  const count = range === "months" ? 12 : 6;
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    if (range === "months") {
      const date = new Date(today.getFullYear(), today.getMonth() - offset, 1);
      values.set(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`, 0);
    } else {
      values.set(String(today.getFullYear() - offset), 0);
    }
  }

  for (const [day, value] of Object.entries(daily)) {
    const key = range === "months" ? day.slice(0, 7) : day.slice(0, 4);
    if (values.has(key)) values.set(key, (values.get(key) ?? 0) + value);
  }

  return [...values].map(([key, value]) => ({
    label: range === "months"
      ? new Intl.DateTimeFormat("es-AR", { month: "short" }).format(new Date(Number(key.slice(0, 4)), Number(key.slice(5, 7)) - 1, 1))
      : key,
    value,
  }));
}

function getWindowsDailyDeltas(snapshots: DailyValues): DailyValues {
  const ordered = Object.entries(snapshots).sort(([left], [right]) => left.localeCompare(right));
  const deltas: DailyValues = {};
  let previous: number | null = null;

  for (const [day, cumulative] of ordered) {
    if (previous !== null) deltas[day] = Math.max(0, cumulative - previous);
    previous = cumulative;
  }

  return deltas;
}

function BarChart({ title, points }: { title: string; points: ChartPoint[] }) {
  const hasData = points.some(({ value }) => value !== null && value > 0);
  const max = Math.max(1, ...points.map(({ value }) => value ?? 0));
  const chartWidth = 720;
  const chartHeight = 190;
  const gap = 12;
  const barWidth = (chartWidth - gap * (points.length - 1)) / points.length;

  return (
    <section className="rounded-3xl border border-[var(--outline-variant)] bg-[var(--surface-container)] p-5 sm:p-7">
      <h2 className="text-base font-semibold text-[var(--on-surface)]">{title}</h2>
      {hasData ? (
        <>
          <svg className="mt-5 h-auto w-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight + 32}`} role="img" aria-label={`Gráfico de ${title}`}>
            <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="var(--outline-variant)" strokeWidth="1" />
            {points.map(({ label, value }, index) => {
              const barHeight = value === null ? 0 : Math.max(value > 0 ? 3 : 0, (value / max) * (chartHeight - 14));
              const x = index * (barWidth + gap);
              const y = chartHeight - barHeight;
              return (
                <g key={`${label}-${index}`}>
                  <title>{`${label}: ${value === null ? "sin dato" : numberFormat.format(value)}`}</title>
                  <rect x={x} y={y} width={barWidth} height={barHeight} rx="6" fill="var(--primary)" opacity={value === null ? 0 : 0.78} />
                  <text x={x + barWidth / 2} y={chartHeight + 22} textAnchor="middle" fill="var(--on-surface-variant)" fontSize="12">{label}</text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-xs text-[var(--on-surface-variant)]">Máximo del período: {numberFormat.format(max)}</p>
        </>
      ) : (
        <p className="mt-5 rounded-2xl bg-[var(--surface-container-high)] px-4 py-6 text-sm leading-6 text-[var(--on-surface-variant)]">
          El historial de este período comenzará a mostrarse a medida que se recopilen datos diarios. No hay datos históricos suficientes para reconstruir períodos anteriores.
        </p>
      )}
    </section>
  );
}

export function MetricsCharts({ androidByDay, windowsSnapshots }: MetricsChartsProps) {
  const [range, setRange] = useState<Range>("week");
  const windowsByDay = useMemo(() => getWindowsDailyDeltas(windowsSnapshots), [windowsSnapshots]);
  const androidPoints = useMemo(() => makePoints(range, androidByDay), [range, androidByDay]);
  const windowsPoints = useMemo(() => makePoints(range, windowsByDay), [range, windowsByDay]);

  const ranges: { id: Range; label: string }[] = [
    { id: "week", label: "7 días" },
    { id: "months", label: "Meses" },
    { id: "years", label: "Años" },
  ];

  return (
    <section className="mt-10" aria-labelledby="metrics-history-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="metrics-history-heading" className="text-xl font-semibold text-[var(--on-surface)]">Descargas en el tiempo</h2>
          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">Las series empiezan a recopilarse desde que se activa esta medición.</p>
        </div>
        <div className="flex rounded-full border border-[var(--outline-variant)] p-1" role="group" aria-label="Período de los gráficos">
          {ranges.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={range === id}
              onClick={() => setRange(id)}
              className={`min-h-10 rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] ${range === id ? "bg-[var(--primary)] text-[var(--on-primary)]" : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-4">
        <BarChart title="Clics en Google Play · SuelosAR para Android" points={androidPoints} />
        <BarChart title="Descargas reportadas por GitHub · Instaladores Windows" points={windowsPoints} />
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--on-surface-variant)]">Los clics Android se agregan por día. Windows muestra la variación diaria del acumulado que informa GitHub; puede incluir descargas hechas fuera de este sitio y no confirma transferencias completas ni instalaciones. El primer snapshot solo establece una base y no permite calcular descargas de ese día.</p>
    </section>
  );
}
