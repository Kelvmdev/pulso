import MetricCard from "@/components/MetricCard";
import CoinList from "@/components/CoinList";
import { getGlobal, getCoins } from "@/lib/coingecko";
import { formatUsd } from "@/lib/format";

export const metadata = {
  description:
    "Precios en vivo del mercado cripto: capitalización total, volumen 24h, dominancia y las principales monedas con sus gráficos.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Cada fetch por separado: si uno falla (p. ej. 429), mostramos lo que sí
  // llegó en vez de tumbar toda la página.
  const [globalRes, coins] = await Promise.all([
    getGlobal().catch(() => null),
    getCoins().catch(() => []),
  ]);

  const data = globalRes?.data ?? null;
  const stats = data
    ? [
        {
          label: "Cap. total del mercado",
          value: formatUsd(data.total_market_cap.usd),
          change: data.market_cap_change_percentage_24h_usd,
        },
        {
          label: "Volumen 24h",
          value: formatUsd(data.total_volume.usd),
          change: data.volume_change_percentage_24h_usd,
        },
        {
          // /global no da %24h de dominancia → sin badge. Mostramos BTC / ETH.
          label: "Dominancia BTC / ETH",
          value: `${data.market_cap_percentage.btc.toFixed(1)}% / ${data.market_cap_percentage.eth.toFixed(1)}%`,
        },
      ]
    : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <section id="mercado" aria-labelledby="mercado-title">
        <h1
          id="mercado-title"
          className="text-2xl font-semibold tracking-tight text-text"
        >
          Mercado
        </h1>
        {stats.length ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <MetricCard key={s.label} {...s} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Métricas no disponibles ahora mismo. Reintenta en un momento.
          </p>
        )}
      </section>

      <section id="top" aria-labelledby="top-title" className="mt-8">
        <h2
          id="top-title"
          className="text-lg font-semibold tracking-tight text-text"
        >
          Top monedas
        </h2>
        <div className="mt-4">
          {coins.length ? (
            <CoinList initialCoins={coins} />
          ) : (
            <p className="text-sm text-muted">
              No pudimos cargar las monedas ahora mismo.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
