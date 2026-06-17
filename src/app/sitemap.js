import { getCoins } from "@/lib/coingecko";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  // Si la API falla, degradamos a solo la home (no rompemos el sitemap).
  const coins = await getCoins().catch(() => []);
  const coinUrls = coins.map((c) => ({
    url: `${SITE}/moneda/${c.id}`,
    changeFrequency: "hourly",
    priority: 0.7,
  }));

  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    ...coinUrls,
  ];
}
