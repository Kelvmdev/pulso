import ChangeBadge from "@/components/ChangeBadge";

export default function MetricCard({ label, value, change }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-sm text-muted">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl tabular-nums text-text">{value}</span>
        {change !== undefined && <ChangeBadge value={change} />}
      </div>
    </div>
  );
}
