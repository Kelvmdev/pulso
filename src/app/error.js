"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error); // visible en logs; no exponemos detalles al usuario
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-text">
        No pudimos cargar el mercado
      </h1>
      <p className="max-w-sm text-muted">
        Puede ser un corte temporal de la API. Intenta de nuevo en un momento.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-brand px-4 py-2 font-medium text-bg outline-none transition-opacity active:scale-95 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text"
      >
        Reintentar
      </button>
    </div>
  );
}
