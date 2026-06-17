export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 motion-safe:animate-pulse sm:px-6">
      {/* título */}
      <div className="h-7 w-32 rounded bg-surface" />
      {/* metric cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg border border-border bg-surface" />
        ))}
      </div>
      {/* subtítulo */}
      <div className="mt-8 h-6 w-36 rounded bg-surface" />
      {/* filas de monedas */}
      <ul className="mt-4 flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="h-14 rounded-lg border border-border bg-surface" />
        ))}
      </ul>
    </div>
  );
}
