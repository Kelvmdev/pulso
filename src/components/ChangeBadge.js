// Badge de variación %24h. La flecha + el signo dan la pista sin depender
// solo del color (accesibilidad).
export default function ChangeBadge({ value }) {
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-xs tabular-nums ${
        up ? "bg-up/10 text-up" : "bg-down/10 text-down"
      }`}
    >
      <span aria-hidden="true">{up ? "▲" : "▼"}</span>
      {value > 0 ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}
