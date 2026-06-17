// Capa server-side para CoinGecko. La key vive solo aquí (servidor),
// se manda en la cabecera x-cg-demo-api-key (nunca en la URL) y NUNCA se loguea.
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
