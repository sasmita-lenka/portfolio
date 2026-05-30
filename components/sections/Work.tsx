import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function Work() {
  return (
    <section id="work" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionHeading number="04" title="Selected Work" />
        <div>
          {projects.map((p, i) => (
            <article
              key={p.code}
              className="grid grid-cols-[34px_1fr] items-start gap-5 border-b border-hairline py-6"
            >
              <span className="font-display text-lg font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">
                  {p.code} · {p.name}
                </h3>
                <p className="mt-1.5 max-w-[62ch] text-[13.5px] leading-relaxed text-muted">
                  {p.summary}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
