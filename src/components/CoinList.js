"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SplitFlap from "@/components/SplitFlap";
import ChangeBadge from "@/components/ChangeBadge";

export default function CoinList({ initialCoins }) {
  const [coins, setCoins] = useState(initialCoins);
  const [reconnecting, setReconnecting] = useState(false);

  // Refresco real cada 60s, sin recargar. /api/markets cachea 60s en servidor,
  // así que esto NO multiplica las llamadas a CoinGecko.
  useEffect(() => {
    const id = setInterval(async () => {
      try {
        const res = await fetch("/api/markets");
        if (!res.ok) {
          // incluye 429 (límite): conservamos los últimos datos buenos
          setReconnecting(true);
          return;
        }
        setCoins(await res.json());
        setReconnecting(false);
      } catch {
        // sin red: conservamos los últimos datos buenos
        setReconnecting(true);
      }
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {reconnecting && (
        <p
          role="status"
          className="mb-2 flex items-center gap-2 text-xs text-muted"
        >
          <span
            className="size-1.5 rounded-full bg-brand motion-safe:animate-pulse"
            aria-hidden="true"
          />
          Reconectando…
        </p>
      )}
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
    </div>
  );
}
