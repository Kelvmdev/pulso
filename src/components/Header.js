import Link from "next/link";

// Mismo trazo para la línea base (tenue) y el latido que la recorre.
const ECG_PATH =
  "M0 20 H70 l5 -12 5 24 6 -28 5 24 5 -8 H150 l5 -12 5 24 6 -28 5 24 5 -8 H240";

export default function Header() {
  return (
    <header className="flex items-center gap-4 border-b border-border px-4 py-3 sm:px-6">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 rounded text-lg font-semibold tracking-tight text-text outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
        Pulso
      </Link>

      {/* Línea de latido / ECG — decorativa, se oculta en pantallas muy chicas */}
      <svg
        viewBox="0 0 240 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="hidden h-8 min-w-0 flex-1 sm:block"
      >
        <path
          d={ECG_PATH}
          fill="none"
          strokeWidth="2"
          className="stroke-border"
        />
        <path
          d={ECG_PATH}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-brand [stroke-dasharray:40_200] motion-safe:animate-ecg"
        />
      </svg>

      <nav
        aria-label="Principal"
        className="ml-auto flex items-center gap-4 text-sm sm:ml-0"
      >
        <Link
          href="/"
          className="rounded text-muted outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
        >
          Mercado
        </Link>
        <Link
          href="/acerca"
          className="rounded text-muted outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
        >
          Acerca
        </Link>
      </nav>
    </header>
  );
}
