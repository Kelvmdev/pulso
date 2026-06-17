// Formatea USD de forma compacta: $2.3T, $79.66B, $148.32, etc.
const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export const formatUsd = (n) => usdCompact.format(n);
