import Image from "next/image";
import SplitFlap from "@/components/SplitFlap";
import ChangeBadge from "@/components/ChangeBadge";

export default function CoinList({ coins }) {
  return (
    <ul className="flex flex-col gap-2">
      {coins.map((c) => (
        <li
          key={c.id}
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border border-border bg-surface px-4 py-3"
        >
          <div className="flex min-w-0 items-center gap-2">
            <Image
              src={c.image}
              alt=""
              width={24}
              height={24}
              className="rounded-full"
            />
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
