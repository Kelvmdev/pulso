import MetricCard from "@/components/MetricCard";
import CoinList from "@/components/CoinList";
import { getGlobal, getCoins } from "@/lib/coingecko";
import { formatUsd } from "@/lib/format";

export default async function Home() {
  const [{ data }, coins] = await Promise.all([getGlobal(), getCoins()]);
  const stats = [
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
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <section id="mercado" aria-labelledby="mercado-title">
        <h1
          id="mercado-title"
          className="text-2xl font-semibold tracking-tight text-text"
        >
          Mercado
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <MetricCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section id="top" aria-labelledby="top-title" className="mt-8">
        <h2
          id="top-title"
          className="text-lg font-semibold tracking-tight text-text"
        >
          Top monedas
        </h2>
        <div className="mt-4">
          <CoinList initialCoins={coins} />
        </div>
      </section>

      <section
        id="acerca"
        aria-labelledby="acerca-title"
        className="mt-8 rounded-lg border border-border bg-surface p-4"
      >
        <h2
          id="acerca-title"
          className="text-lg font-semibold tracking-tight text-text"
        >
          Acerca
        </h2>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Pulso es un monitor del mercado cripto en vivo: capitalización,
          volumen y precios que se actualizan solos.
        </p>
        <p className="mt-2 text-sm text-muted">
          Datos de CoinGecko (pueden tener ~1 min de retraso).
        </p>
        <p className="mt-2 text-sm text-muted">
          Solo informativo, no es asesoría financiera.
        </p>
      </section>
    </div>
  );
}
