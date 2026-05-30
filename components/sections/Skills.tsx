import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionHeading number="02" title="Skills" id="skills-heading" />
        <div className="grid gap-x-11 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="grid grid-cols-[110px_1fr] items-start gap-4 border-b border-hairline py-4"
            >
              <span className="text-xs font-semibold text-ink">{g.label}</span>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
