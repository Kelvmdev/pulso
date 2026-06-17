import { getMarketChart } from "@/lib/coingecko";

// Rangos permitidos y formato de id (validación de entrada: id/days vienen del
// cliente; rechazamos lo raro antes de gastar rate limit/key en CoinGecko).
const ALLOWED_DAYS = new Set(["1", "7", "30", "90", "365"]);
const VALID_ID = /^[a-z0-9-]{1,64}$/;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const days = searchParams.get("days");

  if (!id || !VALID_ID.test(id) || !ALLOWED_DAYS.has(days)) {
    return Response.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  try {
    // La key vive en el helper (servidor) y nunca sale en la respuesta.
    // El fetch interno cachea 10 min por rango.
    const chart = await getMarketChart(id, { days: Number(days) });
    return Response.json(chart.prices);
  } catch {
    return Response.json(
      { error: "No se pudo obtener el histórico" },
      { status: 502 }
    );
  }
}
