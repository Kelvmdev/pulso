import { ImageResponse } from "next/og";
import { getCoin } from "@/lib/coingecko";
import { formatPrice } from "@/lib/format";

export const alt = "Detalle de moneda en Pulso";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params; // Next 16: params es Promise aquí
  const c = await getCoin(id);
  const sym = c.symbol.toUpperCase();
  const chg = c.market_data.price_change_percentage_24h;
  const up = chg >= 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B0F14",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 9999, background: "#2DD4BF" }} />
          <div style={{ fontSize: 32, color: "#8B98A5" }}>Pulso</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24 }}>
          {`${c.name} (${sym})`}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700 }}>
            {formatPrice(c.market_data.current_price.usd)}
          </div>
          <div style={{ fontSize: 40, color: up ? "#3FB950" : "#F85149" }}>
            {`${up ? "+" : ""}${chg.toFixed(2)}%`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
