import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location} · Built with Next.js</span>
      </div>
    </footer>
  );
}
