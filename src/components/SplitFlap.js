"use client";
import { useEffect, useRef } from "react";

// Precio estilo tablero de aeropuerto: cada dígito en su ficha.
// Al cambiar un dígito, SOLO esa ficha voltea (key con el dígito -> remonta).
// El precio completo va en sr-only; las fichas son decorativas (aria-hidden).
const isSeparator = (ch) => "$,. ".includes(ch);

export default function SplitFlap({ value }) {
  const prev = useRef(value); // valor del render anterior (para detectar cambios)
  const prevChars = [...prev.current];
  const chars = [...value];

  useEffect(() => {
    prev.current = value;
  });

  return (
    <span className="inline-flex items-center gap-px font-mono tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex items-center gap-px">
        {chars.map((ch, i) => {
          if (isSeparator(ch)) {
            return (
              <span key={i} className="px-0.5 text-muted">
                {ch}
              </span>
            );
          }
          const changed = prevChars[i] !== ch;
          return (
            <span
              key={`${i}-${ch}`}
              className={`inline-flex min-w-[1ch] origin-top justify-center rounded-sm border border-border bg-bg px-1 py-0.5 text-text ${
                changed ? "motion-safe:animate-flap" : ""
              }`}
            >
              {ch}
            </span>
          );
        })}
      </span>
    </span>
  );
}
