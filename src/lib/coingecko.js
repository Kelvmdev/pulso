// Capa server-side para CoinGecko. La key vive solo aquí (servidor),
// se manda en la cabecera x-cg-demo-api-key (nunca en la URL) y NUNCA se loguea.
import { formatPrice } from "@/lib/format";

const BASE = "https://api.coingecko.com/api/v3";

async function cg(path, { revalidate = 60 } = {}) {
  const key = process.env.COINGECKO_API_KEY;
  const headers = { accept: "application/json" };
  if (key) headers["x-cg-demo-api-key"] = key;

  const res = await fetch(`${BASE}${path}`, {
    headers,
    next: { revalidate }, // Next cachea y revalida cada ~60s
  });

  if (!res.ok) {
    // No incluimos la cabecera ni la key en el error.
    throw new Error(`CoinGecko ${path} respondió ${res.status}`);
  }
  return res.json();
}

export function getGlobal() {
  return cg("/global");
}

export function getMarkets({ perPage = 10 } = {}) {
  const params = new URLSearchParams({
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: String(perPage),
    page: "1",
    price_change_percentage: "24h",
  });
  return cg(`/coins/markets?${params}`);
}

// Monedas ya mapeadas a la forma que usa la UI (precio formateado incluido).
export async function getCoins() {
  const markets = await getMarkets();
  return markets.map((c) => ({
    id: c.id,
    name: c.name,
    ticker: c.symbol.toUpperCase(),
    price: formatPrice(c.current_price),
    change: c.price_change_percentage_24h,
    image: c.image,
  }));
}
