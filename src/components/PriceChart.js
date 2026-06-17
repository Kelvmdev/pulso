"use client";
import { useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

// Lienzo en unidades SVG; escala responsivo con preserveAspectRatio="none".
// La línea usa vector-effect:non-scaling-stroke para no deformar su grosor.
const W = 700;
const H = 240;
const PAD = 12;

const dateFmt = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});
const dayFmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" });

export default function PriceChart({ prices }) {
  const ref = useRef(null);
  const [active, setActive] = useState(null); // índice del punto bajo el puntero

  const n = prices.length;
  const vals = prices.map((p) => p[1]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;

  const x = (i) => (i / (n - 1)) * W;
  const y = (v) => PAD + (1 - (v - min) / span) * (H - 2 * PAD);

  const line = prices
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(p[1]).toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  const first = vals[0];
  const last = vals[n - 1];
  const changePct = ((last - first) / first) * 100;
  const summary = `Evolución del precio en 7 días: desde ${formatPrice(
    first
  )} hasta ${formatPrice(last)}, ${changePct >= 0 ? "+" : ""}${changePct.toFixed(
    2
  )}%.`;

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setActive(Math.round(frac * (n - 1)));
  }

  const frac = active != null ? active / (n - 1) : 0;

  return (
    <figure>
      <figcaption className="sr-only">{summary}</figcaption>
      <div
        ref={ref}
        className="relative touch-pan-y"
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={summary}
          className="h-48 w-full sm:h-64"
        >
          <defs>
            <linearGradient id="pulso-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#pulso-area)" />
          <path
            d={line}
            fill="none"
            pathLength={1}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="stroke-brand [stroke-dasharray:1] [vector-effect:non-scaling-stroke] motion-safe:animate-draw"
          />
          {active != null && (
            <>
              <line
                x1={x(active)}
                y1="0"
                x2={x(active)}
                y2={H}
                strokeWidth="1"
                className="stroke-border [vector-effect:non-scaling-stroke]"
              />
              <circle cx={x(active)} cy={y(vals[active])} r="3" className="fill-brand" />
            </>
          )}
        </svg>

        {/* ejes discretos */}
        <span className="pointer-events-none absolute right-1 top-0 font-mono text-xs text-muted">
          {formatPrice(max)}
        </span>
        <span className="pointer-events-none absolute bottom-5 right-1 font-mono text-xs text-muted">
          {formatPrice(min)}
        </span>
        <span className="pointer-events-none absolute bottom-0 left-0 text-xs text-muted">
          {dayFmt.format(new Date(prices[0][0]))}
        </span>
        <span className="pointer-events-none absolute bottom-0 right-0 text-xs text-muted">
          {dayFmt.format(new Date(prices[n - 1][0]))}
        </span>

        {/* tooltip */}
        {active != null && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-md border border-border bg-bg px-2 py-1 text-center"
            style={{ left: `${frac * 100}%` }}
          >
            <div className="font-mono text-sm tabular-nums text-text">
              {formatPrice(vals[active])}
            </div>
            <div className="text-xs text-muted">
              {dateFmt.format(new Date(prices[active][0]))}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
