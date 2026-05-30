export function SectionHeading({
  number,
  title,
  id,
}: {
  number: string;
  title: string;
  id?: string;
}) {
  return (
    <h2 id={id} className="mb-7 flex items-baseline gap-3">
      <span aria-hidden="true" className="text-xs font-semibold tracking-[0.14em] text-accent">
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{title}</span>
    </h2>
  );
}
