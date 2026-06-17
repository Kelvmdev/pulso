import SplitFlap from "@/components/SplitFlap";
import ChangeBadge from "@/components/ChangeBadge";
import { coins } from "@/lib/mock";

export default function CoinList() {
  return (
    <ul className="flex flex-col gap-2">
      {coins.map((c) => (
        <li
          key={c.ticker}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border border-border bg-surface px-4 py-3"
        >
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="truncate font-medium text-text">{c.name}</span>
            <span className="font-mono text-xs text-muted">{c.ticker}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <SplitFlap value={c.price} />
            <ChangeBadge value={c.change} />
          </div>
        </li>
      ))}
    </ul>
  );
}
