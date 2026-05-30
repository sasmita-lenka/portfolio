import { profile } from "@/content/profile";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight text-ink">
          {profile.name}
        </a>
        <div className="flex items-center gap-5 text-sm text-muted">
          <ul className="hidden items-center gap-5 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="cursor-pointer hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {profile.available && (
            <span className="hidden items-center gap-1.5 font-medium text-accent md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Available
            </span>
          )}
          <a
            href={profile.resumeUrl}
            download
            className="cursor-pointer rounded-full border border-hairline px-4 py-1.5 font-medium text-ink hover:border-ink"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
