import Link from "next/link";

export const metadata = {
  title: "Acerca",
  description:
    "Qué es Pulso, de dónde vienen los datos y aviso de uso informativo.",
  alternates: { canonical: "/acerca" },
};

export default function Acerca() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded text-sm text-muted outline-none transition-colors active:scale-95 hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
      >
        ← Volver al dashboard
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-text">
        Acerca de Pulso
      </h1>

      <div className="mt-4 flex flex-col gap-4 text-muted">
        <p>
          Pulso es un monitor del mercado cripto en vivo: capitalización total,
          volumen de 24 horas, dominancia y los precios de las principales
          monedas, con gráficos de su evolución.
        </p>
        <p>
          Los datos se actualizan solos, sin recargar la página: las cifras
          laten y los precios voltean como un tablero de aeropuerto cuando
          cambian.
        </p>

        <h2 className="mt-2 text-lg font-semibold tracking-tight text-text">
          Datos
        </h2>
        <p>Datos de CoinGecko (pueden tener ~1 min de retraso).</p>

        <h2 className="mt-2 text-lg font-semibold tracking-tight text-text">
          Aviso
        </h2>
        <p>Solo informativo, no es asesoría financiera.</p>
      </div>
    </div>
  );
}
