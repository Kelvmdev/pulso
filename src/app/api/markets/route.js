import { getCoins } from "@/lib/coingecko";

// Devuelve las monedas mapeadas. La key vive en el helper (servidor) y nunca
// sale en la respuesta. El fetch interno cachea 60s -> 1 llamada/min a CoinGecko
// aunque haya muchos visitantes.
export async function GET() {
  const coins = await getCoins();
  return Response.json(coins);
}
