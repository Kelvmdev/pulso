import Image from "next/image";
import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import ChartPanel from "@/components/ChartPanel";
import { getCoin, getMarketChart } from "@/lib/coingecko";
import { formatUsd, formatPrice } from "@/lib/format";

export default async function MonedaDetalle({ params }) {
  const { id } = await params; // Next 16: params es asíncrono
  const [c, chart] = await Promise.all([getCoin(id), getMarketChart(id)]);
  const md = c.market_data;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded text-sm text-muted outline-none transition-colors hover:text-text focus-visible:ring-2 focus-visible:ring-brand"
      >
        ← Volver
      </Link>

      <header className="mt-4 flex flex-wrap items-center gap-4">
        <Image
          src={c.image.large}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />
        <h1 className="flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-text">
          {c.name}
          <span className="font-mono text-sm text-muted">
            {c.symbol.toUpperCase()}
          </span>
        </h1>
      </header>

      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="font-mono text-3xl tabular-nums text-text">
          {formatPrice(md.current_price.usd)}
        </span>
        <ChangeBadge value={md.price_change_percentage_24h} />
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4">
          <dt className="text-sm text-muted">Capitalización</dt>
          <dd className="mt-1 font-mono text-xl tabular-nums text-text">
            {formatUsd(md.market_cap.usd)}
          </dd>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <dt className="text-sm text-muted">Ranking</dt>
          <dd className="mt-1 font-mono text-xl tabular-nums text-text">
            #{c.market_cap_rank}
          </dd>
        </div>
      </dl>

      <ChartPanel id={id} initialPrices={chart.prices} />
    </div>
  );
}
