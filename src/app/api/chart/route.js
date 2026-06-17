import { getMarketChart } from "@/lib/coingecko";

// Rangos permitidos (validación de entrada: el id/days vienen del cliente).
const ALLOWED_DAYS = new Set(["1", "7", "30", "90", "365"]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const days = searchParams.get("days");

  if (!id || !ALLOWED_DAYS.has(days)) {
    return Response.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  // La key vive en el helper (servidor) y nunca sale en la respuesta.
  // El fetch interno cachea 10 min por rango.
  const chart = await getMarketChart(id, { days: Number(days) });
  return Response.json(chart.prices);
}
