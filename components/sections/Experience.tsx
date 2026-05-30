import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionHeading number="03" title="Experience" id="experience-heading" />
        <div>
          {experience.map((e) => (
            <article
              key={`${e.title}-${e.period}`}
              className="grid gap-6 border-b border-hairline py-6 md:grid-cols-[140px_1fr]"
            >
              <div className="text-xs text-muted">
                {e.period}
                <span className="mt-1 block font-display font-medium text-accent">{e.tag}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <p className="mt-0.5 text-[13px] text-muted">{e.org}</p>
                {e.bullets.length > 0 && (
                  <ul className="mt-2.5 list-disc pl-4">
                    {e.bullets.map((b) => (
                      <li key={b} className="mb-1.5 text-[13.5px] leading-relaxed text-ink/85">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
