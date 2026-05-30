export function SectionHeading({
  number,
  title,
  centered = false,
}: {
  number: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-7 flex items-baseline gap-3 ${centered ? "justify-center" : ""}`}>
      <span className="text-xs font-semibold tracking-[0.14em] text-accent">{number}</span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{title}</span>
    </div>
  );
}
