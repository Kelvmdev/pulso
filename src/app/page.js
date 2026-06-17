import MetricCard from "@/components/MetricCard";
import { marketStats } from "@/lib/mock";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <section id="mercado" aria-labelledby="mercado-title">
        <h1
          id="mercado-title"
          className="text-2xl font-semibold tracking-tight text-text"
        >
          Mercado
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {marketStats.map((s) => (
            <MetricCard key={s.label} {...s} />
          ))}
        </div>
      </section>
    </div>
  );
}
