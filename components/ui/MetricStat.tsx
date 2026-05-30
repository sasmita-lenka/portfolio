export function MetricStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold leading-none text-ink">{value}</div>
      <div className="mt-1.5 text-xs text-muted">{label}</div>
    </div>
  );
}
