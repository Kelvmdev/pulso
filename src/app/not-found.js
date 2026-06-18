import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="font-mono text-5xl font-bold text-brand">404</p>
      <h1 className="text-2xl font-semibold tracking-tight text-text">
        Página no encontrada
      </h1>
      <p className="max-w-sm text-muted">
        La moneda o página que buscas no existe.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-brand px-4 py-2 font-medium text-bg outline-none transition-opacity active:scale-95 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text"
      >
        Volver al dashboard
      </Link>
    </div>
  );
}
