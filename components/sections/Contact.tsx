import { profile } from "@/content/profile";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section id="contact" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">05</span> Contact
        </p>
        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight">
          Let&apos;s build something <em className="italic text-accent">secure.</em>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[46ch] text-[15px] leading-relaxed text-muted">
          Open to full-time Software Engineer roles, backend, full-stack, or fintech.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={`mailto:${profile.email}`}>Email me</Button>
          <Button href={profile.linkedin} variant="ghost" target="_blank" rel="noreferrer">
            LinkedIn
          </Button>
          <Button href={profile.resumeUrl} download variant="ghost">
            Résumé
          </Button>
        </div>
      </div>
    </section>
  );
}
