import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 text-sm text-muted sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text">
            <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
            <span className="font-semibold tracking-tight">Pulso</span>
          </div>
          <p className="max-w-xs">Monitor del mercado cripto en vivo.</p>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col gap-2 sm:items-end">
          <Link
            href="/"
            className="rounded outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
          >
            Mercado
          </Link>
          <Link
            href="/acerca"
            className="rounded outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
          >
            Acerca
          </Link>
          <span>Datos: CoinGecko</span>
        </nav>
      </div>

      <p className="mx-auto mt-6 w-full max-w-6xl text-xs">
        © 2026 Pulso · Hecho con Next.js + Tailwind ·{" "}
        <a
          href="https://mi-portafolio-eta-hazel.vercel.app/"
          target="_blank"
          rel="noopener"
          className="rounded underline outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
        >
          Sitio por Kervin
        </a>
      </p>
    </footer>
  );
}
