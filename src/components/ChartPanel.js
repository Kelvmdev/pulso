"use client";
import { useState } from "react";
import PriceChart from "@/components/PriceChart";

const RANGES = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
  { label: "1a", days: 365 },
];

export default function ChartPanel({ id, initialPrices }) {
  const [days, setDays] = useState(7); // rango seleccionado (resalta el botón)
  const [prices, setPrices] = useState(initialPrices);
  const [status, setStatus] = useState("ok"); // ok | loading | error
  const [renderKey, setRenderKey] = useState(0); // remonta el chart al traer datos

  async function selectRange(d) {
    if (d === days && status === "ok") return;
    setDays(d);
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/chart?id=${encodeURIComponent(id)}&days=${d}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error();
      setPrices(data);
      setRenderKey((k) => k + 1);
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-8" aria-label="Gráfico de precio">
      <div role="group" aria-label="Rango de tiempo" className="flex flex-wrap gap-2">
        {RANGES.map((r) => {
          const isActive = days === r.days;
          return (
            <button
              key={r.days}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectRange(r.days)}
              className={`rounded-md border px-3 py-1 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand ${
                isActive
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border text-muted hover:text-text"
              }`}
            >
              {r.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-4">
        {status === "error" ? (
          <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface px-4 text-center sm:h-64">
            <p className="text-muted">No pudimos cargar este rango.</p>
            <button
              type="button"
              onClick={() => selectRange(days)}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-bg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <PriceChart key={renderKey} prices={prices} />
            {status === "loading" && (
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-lg bg-bg/40 motion-safe:animate-pulse"
              />
            )}
            <span role="status" className="sr-only">
              {status === "loading" ? "Cargando gráfico…" : ""}
            </span>
          </>
        )}
      </div>
    </section>
  );
}
