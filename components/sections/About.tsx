import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { lead, body, pillars } = profile.about;
  return (
    <section id="about" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionHeading number="01" title="About" />
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-display text-xl leading-snug">{lead}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{body}</p>
          </div>
          <div className="flex flex-col gap-5">
            {pillars.map((p) => (
              <div key={p.title} className="border-l border-accent pl-4">
                <h3 className="font-display text-[15px] font-semibold">{p.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
