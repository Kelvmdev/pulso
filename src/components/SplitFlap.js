// Precio estilo tablero de aeropuerto: cada dígito en su ficha.
// Estático por ahora; el "volteo al actualizar" llega en P3 (con la API).
// Los separadores ($ , . espacio) van sueltos; los dígitos en fichas.
const isSeparator = (ch) => "$,. ".includes(ch);

export default function SplitFlap({ value }) {
  return (
    <span className="inline-flex items-center gap-px font-mono tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex items-center gap-px">
        {[...value].map((ch, i) =>
          isSeparator(ch) ? (
            <span key={i} className="px-0.5 text-muted">
              {ch}
            </span>
          ) : (
            <span
              key={i}
              className="inline-flex min-w-[1ch] justify-center rounded-sm border border-border bg-bg px-1 py-0.5 text-text"
            >
              {ch}
            </span>
          )
        )}
      </span>
    </span>
  );
}
