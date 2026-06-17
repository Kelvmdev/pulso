// Formatea USD de forma compacta: $2.3T, $79.66B, $148.32, etc.
const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export const formatUsd = (n) => usdCompact.format(n);

// Precio de una moneda: $64,152.00, $0.5231 (más decimales si es sub-$1).
export const formatPrice = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: n >= 1 ? 2 : 6,
  }).format(n);
