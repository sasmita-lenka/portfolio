import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";
import { MetricStat } from "@/components/ui/MetricStat";

export function Hero() {
  const { headline, summary, role, focus, metrics, resumeUrl } = profile;
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-10 pt-14">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {role} · {focus}
      </p>
      <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,4.5rem)] font-medium leading-[0.98] tracking-tight">
        {headline.lead} <em className="italic text-accent">{headline.emphasis}</em>{" "}
        <br />
        {headline.trail}
      </h1>
      <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-muted">{summary}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button href="#work">View work</Button>
        <Button href={resumeUrl} download variant="ghost">
          Download résumé
        </Button>
      </div>
      <div className="mt-11 flex flex-wrap gap-10">
        {metrics.map((m) => (
          <MetricStat key={m.label} value={m.value} label={m.label} />
        ))}
      </div>
    </section>
  );
}
