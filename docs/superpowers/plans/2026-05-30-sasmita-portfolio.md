# Sasmita Lenka Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio for Sasmita Lenka (Software Engineer, Fintech and Payments) in the warm editorial serif style, optimized for recruiters and SEO.

**Architecture:** Next.js App Router with TypeScript. Content lives in typed data modules under `content/`, separate from markup. Section components under `components/sections/` compose the page. Shared primitives under `components/ui/`. Design tokens centralized in Tailwind v4 `@theme` and font CSS variables, so a re-theme touches one place. Mostly server components, minimal client JS (one Reveal wrapper, one mobile menu toggle). SEO objects live in `lib/seo.ts` (plain TS) so they are testable without importing fonts.

**Tech Stack:** Next.js (latest), TypeScript, Tailwind CSS v4, next/font (Fraunces + Inter), Vitest + React Testing Library + jsdom. Deploy on Vercel.

**Content source of truth:** spec at `docs/superpowers/specs/2026-05-30-sasmita-portfolio-design.md`. Hard content rules: location is "Bangalore, India" or "India" only (never Odisha); MCA only (2020 to 2022); no GitHub; contact links are Email, LinkedIn, Résumé only. Avoid em dashes in all copy (use commas, hyphens, or middots).

---

## Task 1: Scaffold the Next.js app

**Files:**
- Create: project files via `create-next-app` (package.json, tsconfig.json, next.config.ts, app/, public/, etc.)
- Modify: `.gitignore` (re-add `.superpowers/`)

- [ ] **Step 1: Scaffold into a temp dir, then relocate to repo root**

The repo root already contains `.git`, `docs/`, the source resume PDFs, and `.superpowers/`. `create-next-app` refuses a non-empty dir, so scaffold into a temp subdir (it will detect the parent git repo and skip re-init) and move files up.

```bash
npx create-next-app@latest .portfolio-init \
  --typescript --tailwind --app --eslint \
  --no-src-dir --import-alias "@/*" --use-npm --no-turbopack --yes
shopt -s dotglob
mv .portfolio-init/* .
rm -f .gitignore.next 2>/dev/null || true
# keep our existing .gitignore; move the rest, then drop the temp dir
rm -rf .portfolio-init
shopt -u dotglob
```

- [ ] **Step 2: Re-add the brainstorm ignore (create-next-app may have overwritten .gitignore)**

Ensure `.gitignore` contains these lines (append any that are missing):

```
.superpowers/
.env
.env*.local
.vercel
```

- [ ] **Step 3: Verify dev server boots and build passes**

Run: `npm run build`
Expected: build completes with no type errors, prints route `/` as static.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Tailwind and TypeScript

Assisted by AI"
```

---

## Task 2: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `lib/__tests__/smoke.test.ts`
- Modify: `package.json` (scripts)

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths jsdom \
  @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
  },
});
```

- [ ] **Step 3: Write `vitest.setup.ts`** (jest-dom matchers + IntersectionObserver mock for the Reveal component)

```ts
import "@testing-library/jest-dom/vitest";

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error jsdom has no IntersectionObserver
globalThis.IntersectionObserver = IO;
// @ts-expect-error jsdom has no matchMedia
globalThis.matchMedia ||= (q: string) => ({
  matches: false,
  media: q,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  onchange: null,
  dispatchEvent() {
    return false;
  },
});
```

- [ ] **Step 4: Add scripts to `package.json`**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 5: Write the smoke test `lib/__tests__/smoke.test.ts`**

```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: 1 passing test.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "test: add Vitest and React Testing Library setup

Assisted by AI"
```

---

## Task 3: Content data modules + content-rules tests

**Files:**
- Create: `content/profile.ts`
- Create: `content/skills.ts`
- Create: `content/experience.ts`
- Create: `content/projects.ts`
- Test: `content/__tests__/content-rules.test.ts`

- [ ] **Step 1: Write the failing content-rules test `content/__tests__/content-rules.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

const blob = JSON.stringify({ profile, skillGroups, experience, projects }).toLowerCase();

describe("content rules", () => {
  it("never mentions Odisha", () => {
    expect(blob).not.toContain("odisha");
  });
  it("never mentions GitHub", () => {
    expect(blob).not.toContain("github");
  });
  it("uses Bangalore, India for location", () => {
    expect(profile.location).toBe("Bangalore, India");
  });
  it("has the correct email and linkedin", () => {
    expect(profile.email).toBe("lenkasasmita94@gmail.com");
    expect(profile.linkedin).toBe("https://linkedin.com/in/sasmita-lenka");
  });
  it("exposes exactly four headline metrics", () => {
    expect(profile.metrics).toHaveLength(4);
  });
  it("includes the MCA education entry dated 2020 to 2022", () => {
    const mca = experience.find((e) => e.kind === "education");
    expect(mca).toBeDefined();
    expect(mca?.period).toBe("2020 - 2022");
  });
  it("has four selected projects", () => {
    expect(projects).toHaveLength(4);
  });
  it("contains no em dashes in copy", () => {
    expect(blob).not.toContain("—");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- content-rules`
Expected: FAIL, cannot resolve `@/content/profile`.

- [ ] **Step 3: Write `content/profile.ts`**

```ts
export const profile = {
  name: "Sasmita Lenka",
  role: "Software Engineer",
  focus: "Fintech & Payments",
  location: "Bangalore, India",
  email: "lenkasasmita94@gmail.com",
  linkedin: "https://linkedin.com/in/sasmita-lenka",
  resumeUrl: "/sasmita-lenka-resume.pdf",
  available: true,
  headline: { lead: "Engineering", emphasis: "trust", trail: "in money." },
  summary:
    "I build secure, high-scale payment systems (AEPS, BBPS, MATM, POS, ISO 8583) that move 2M+ transactions a day. 4+ years across Java, Spring Boot, microservices, and React.",
  metrics: [
    { value: "2M+", label: "Daily transactions" },
    { value: "40%", label: "Throughput gain" },
    { value: "30%", label: "Lower latency" },
    { value: "4+", label: "Years experience" },
  ],
  about: {
    lead:
      "I build the backbone of digital payments, from Micro-ATM and POS to Aadhaar payments and bill pay.",
    body:
      "Four years and counting at IServeU, shipping systems that stay correct under load: ISO 8583 switching, NPCI and UIDAI compliance, AES-256 and HSM-backed security, and Kubernetes autoscaling that cut infra cost 30%. I lead a backend team and deliver on time.",
    pillars: [
      { title: "Payments core", body: "ISO 8583, AEPS, BBPS, MATM, POS, NPCI routing." },
      { title: "Scale & DevOps", body: "Microservices, K8s (HPA), Docker, Jenkins, Grafana." },
      { title: "Security", body: "AES-256, HSM tokenization, mutual SSL, HMAC, PCI-DSS." },
    ],
  },
} as const;
```

- [ ] **Step 4: Write `content/skills.ts`**

```ts
export const skillGroups = [
  { label: "Languages", items: ["Java", "JavaScript", "SQL"] },
  { label: "Frameworks", items: ["Spring Boot", "React.js"] },
  { label: "Backend", items: ["REST APIs", "Microservices"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { label: "DevOps", items: ["Docker", "Kubernetes", "Jenkins", "CI/CD"] },
  { label: "Monitoring", items: ["Grafana", "Prometheus"] },
  { label: "Payments", items: ["ISO 8583", "NPCI", "UIDAI", "PCI-DSS"] },
  { label: "Security", items: ["AES-256", "HSM", "Mutual SSL", "HMAC"] },
] as const;
```

- [ ] **Step 5: Write `content/experience.ts`**

```ts
export type ExperienceEntry = {
  kind: "work" | "education";
  period: string;
  tag: string;
  title: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    kind: "work",
    period: "Nov 2022 - Present",
    tag: "Module Lead",
    title: "Module Lead",
    org: "IServeU Technology Pvt. Ltd. · Bangalore, India",
    bullets: [
      "Designed scalable backends for AEPS, MATM, POS, BBPS on microservices.",
      "Refactored core transaction modules: +40% throughput, -30% latency, 2x deploy velocity.",
      "Migrated to Kubernetes (HPA), cutting cloud infra cost ~30%.",
      "Led backend team, code reviews, 100% on-time sprint delivery.",
    ],
  },
  {
    kind: "work",
    period: "Apr 2022 - Nov 2022",
    tag: "Intern",
    title: "Software Engineer Intern",
    org: "IServeU Technology Pvt. Ltd. · Bangalore, India",
    bullets: [
      "Built core MATM and POS services on ISO 8583 transaction flows.",
      "Integrated payment APIs, configured cloud envs, real-time transaction handling.",
    ],
  },
  {
    kind: "education",
    period: "2020 - 2022",
    tag: "MCA",
    title: "Master of Computer Application",
    org: "Biju Patnaik University of Technology · CGPA 8.6",
    bullets: [],
  },
];
```

- [ ] **Step 6: Write `content/projects.ts`**

```ts
export const projects = [
  {
    code: "MATM",
    name: "Micro ATM",
    summary:
      "Secure Micro-ATM backend: cash withdrawal, balance and mini-statement via handheld terminals. Dynamic NPCI bank routing, AES-256 data protection.",
    tags: ["ISO 8583", "NPCI", "AES-256"],
  },
  {
    code: "POS",
    name: "Point of Sale",
    summary:
      "mPOS card-payment platform with real-time validation across banks. Switch Handler for NSDL and IPPB routing, HSM tokenization, dynamic ISO 8583.",
    tags: ["ISO 8583", "HSM", "Multi-bank"],
  },
  {
    code: "AEPS",
    name: "Aadhaar Payments",
    summary:
      "Aadhaar biometric payments (RD Services: Mantra, Morpho) per UIDAI. Secure PID block processing, device certification, HMAC validation.",
    tags: ["UIDAI", "Biometric", "HMAC"],
  },
  {
    code: "BBPS",
    name: "Bharat Bill Payment",
    summary:
      "Real-time utility bill pay on NPCI BBPS. Microservices for biller discovery, validation, payment and settlement; async for scale.",
    tags: ["NPCI BBPS", "Microservices", "Async"],
  },
] as const;
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm test -- content-rules`
Expected: PASS, all assertions green.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add typed content data with content-rule tests

Assisted by AI"
```

---

## Task 4: Design tokens + fonts

**Files:**
- Create: `app/fonts.ts`
- Create: `lib/theme.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Test: `lib/__tests__/theme.test.ts`

- [ ] **Step 1: Write the failing token test `lib/__tests__/theme.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { theme } from "@/lib/theme";

describe("theme tokens", () => {
  it("exposes the warm editorial palette", () => {
    expect(theme.paper).toBe("#faf6f0");
    expect(theme.ink).toBe("#2b2620");
    expect(theme.accent).toBe("#b5562f");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- theme`
Expected: FAIL, cannot resolve `@/lib/theme`.

- [ ] **Step 3: Write `lib/theme.ts`** (single source for palette, reused by OG image and JSON-LD)

```ts
export const theme = {
  paper: "#faf6f0",
  ink: "#2b2620",
  muted: "#7a7164",
  accent: "#b5562f",
  hairline: "#e7e0d4",
  surface: "#ffffff",
} as const;
```

- [ ] **Step 4: Write `app/fonts.ts`**

```ts
import { Fraunces, Inter } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
```

- [ ] **Step 5: Replace `app/globals.css` with the token theme**

```css
@import "tailwindcss";

@theme {
  --color-paper: #faf6f0;
  --color-ink: #2b2620;
  --color-muted: #7a7164;
  --color-accent: #b5562f;
  --color-hairline: #e7e0d4;
  --color-surface: #ffffff;

  --font-display: var(--font-fraunces);
  --font-sans: var(--font-inter);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

section[id] {
  scroll-margin-top: 5rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Wire fonts into `app/layout.tsx`** (keep metadata import for Task 16; for now a minimal layout)

```tsx
import type { Metadata } from "next";
import { fraunces, inter } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sasmita Lenka",
  description: "Software Engineer, Fintech and Payments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Run the token test and the build**

Run: `npm test -- theme`
Expected: PASS.
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, fonts, and global theme

Assisted by AI"
```

---

## Task 5: Button primitive

**Files:**
- Create: `components/ui/Button.tsx`
- Test: `components/ui/__tests__/Button.test.tsx`

- [ ] **Step 1: Write the failing test `components/ui/__tests__/Button.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders an anchor with href and label", () => {
    render(<Button href="#work">View work</Button>);
    const link = screen.getByRole("link", { name: "View work" });
    expect(link).toHaveAttribute("href", "#work");
  });

  it("applies the solid variant by default and ghost when asked", () => {
    const { rerender } = render(<Button href="#a">A</Button>);
    expect(screen.getByRole("link", { name: "A" }).className).toContain("bg-accent");
    rerender(
      <Button href="#b" variant="ghost">
        B
      </Button>,
    );
    expect(screen.getByRole("link", { name: "B" }).className).toContain("border-hairline");
  });

  it("uses cursor-pointer", () => {
    render(<Button href="#c">C</Button>);
    expect(screen.getByRole("link", { name: "C" }).className).toContain("cursor-pointer");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Button`
Expected: FAIL, cannot resolve `@/components/ui/Button`.

- [ ] **Step 3: Write `components/ui/Button.tsx`**

```tsx
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  download?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const base =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium cursor-pointer " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const variants = {
  solid: "bg-accent text-paper border border-accent hover:opacity-90",
  ghost: "bg-transparent text-ink border border-hairline hover:border-ink",
};

export function Button({ href, children, variant = "solid", download, ...rest }: ButtonProps) {
  return (
    <a
      href={href}
      download={download}
      className={`${base} ${variants[variant]}`}
      {...rest}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Button`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Button primitive

Assisted by AI"
```

---

## Task 6: Tag, SectionHeading, MetricStat primitives

**Files:**
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `components/ui/MetricStat.tsx`
- Test: `components/ui/__tests__/primitives.test.tsx`

- [ ] **Step 1: Write the failing test `components/ui/__tests__/primitives.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricStat } from "@/components/ui/MetricStat";

describe("Tag", () => {
  it("renders its label", () => {
    render(<Tag>Java</Tag>);
    expect(screen.getByText("Java")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders the number and title", () => {
    render(<SectionHeading number="01" title="About" />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
});

describe("MetricStat", () => {
  it("renders value and label", () => {
    render(<MetricStat value="2M+" label="Daily transactions" />);
    expect(screen.getByText("2M+")).toBeInTheDocument();
    expect(screen.getByText("Daily transactions")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- primitives`
Expected: FAIL, cannot resolve the modules.

- [ ] **Step 3: Write `components/ui/Tag.tsx`**

```tsx
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-ink/80">
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Write `components/ui/SectionHeading.tsx`**

```tsx
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
```

- [ ] **Step 5: Write `components/ui/MetricStat.tsx`**

```tsx
export function MetricStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold leading-none text-ink">{value}</div>
      <div className="mt-1.5 text-xs text-muted">{label}</div>
    </div>
  );
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- primitives`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Tag, SectionHeading, MetricStat primitives

Assisted by AI"
```

---

## Task 7: Nav section

**Files:**
- Create: `components/sections/Nav.tsx`
- Test: `components/sections/__tests__/Nav.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/Nav.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/sections/Nav";

describe("Nav", () => {
  it("shows the wordmark and anchor links", () => {
    render(<Nav />);
    expect(screen.getByText("Sasmita Lenka")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /work/i })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "#about");
  });

  it("has a résumé download link", () => {
    render(<Nav />);
    const resume = screen.getByRole("link", { name: /résumé/i });
    expect(resume).toHaveAttribute("href", "/sasmita-lenka-resume.pdf");
  });

  it("does not render a GitHub link", () => {
    render(<Nav />);
    expect(screen.queryByText(/github/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Nav`
Expected: FAIL, cannot resolve `@/components/sections/Nav`.

- [ ] **Step 3: Write `components/sections/Nav.tsx`**

```tsx
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Nav`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add sticky nav

Assisted by AI"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Test: `components/sections/__tests__/Hero.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/Hero.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the headline words", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Engineering trust in money.");
  });

  it("renders both CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /view work/i })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/sasmita-lenka-resume.pdf",
    );
  });

  it("renders four metrics", () => {
    render(<Hero />);
    expect(screen.getByText("2M+")).toBeInTheDocument();
    expect(screen.getByText("4+")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL, cannot resolve `@/components/sections/Hero`.

- [ ] **Step 3: Write `components/sections/Hero.tsx`**

```tsx
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add hero section

Assisted by AI"
```

---

## Task 9: About section

**Files:**
- Create: `components/sections/About.tsx`
- Test: `components/sections/__tests__/About.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/About.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/About";

describe("About", () => {
  it("renders inside an #about section", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#about")).not.toBeNull();
  });

  it("renders the three pillars", () => {
    render(<About />);
    expect(screen.getByText("Payments core")).toBeInTheDocument();
    expect(screen.getByText("Scale & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- About`
Expected: FAIL, cannot resolve `@/components/sections/About`.

- [ ] **Step 3: Write `components/sections/About.tsx`**

```tsx
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- About`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add about section

Assisted by AI"
```

---

## Task 10: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`
- Test: `components/sections/__tests__/Skills.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/Skills.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "@/components/sections/Skills";

describe("Skills", () => {
  it("renders inside a #skills section", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("section#skills")).not.toBeNull();
  });

  it("renders group labels and tags", () => {
    render(<Skills />);
    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.getByText("ISO 8583")).toBeInTheDocument();
    expect(screen.getByText("Spring Boot")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Skills`
Expected: FAIL.

- [ ] **Step 3: Write `components/sections/Skills.tsx`**

```tsx
import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export function Skills() {
  return (
    <section id="skills" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionHeading number="02" title="Skills" />
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Skills`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add skills section

Assisted by AI"
```

---

## Task 11: Experience section

**Files:**
- Create: `components/sections/Experience.tsx`
- Test: `components/sections/__tests__/Experience.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/Experience.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Experience } from "@/components/sections/Experience";

describe("Experience", () => {
  it("renders inside an #experience section", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("section#experience")).not.toBeNull();
  });

  it("renders roles and the MCA entry", () => {
    render(<Experience />);
    expect(screen.getByText("Module Lead")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
    expect(screen.getByText("Master of Computer Application")).toBeInTheDocument();
    expect(screen.getByText("2020 - 2022")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Experience`
Expected: FAIL.

- [ ] **Step 3: Write `components/sections/Experience.tsx`**

```tsx
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionHeading number="03" title="Experience" />
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Experience`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add experience section

Assisted by AI"
```

---

## Task 12: Selected Work section

**Files:**
- Create: `components/sections/Work.tsx`
- Test: `components/sections/__tests__/Work.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/Work.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Work } from "@/components/sections/Work";

describe("Work", () => {
  it("renders inside a #work section", () => {
    const { container } = render(<Work />);
    expect(container.querySelector("section#work")).not.toBeNull();
  });

  it("renders all four projects with codes", () => {
    render(<Work />);
    expect(screen.getByText(/Micro ATM/)).toBeInTheDocument();
    expect(screen.getByText(/Point of Sale/)).toBeInTheDocument();
    expect(screen.getByText(/Aadhaar Payments/)).toBeInTheDocument();
    expect(screen.getByText(/Bharat Bill Payment/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Work`
Expected: FAIL.

- [ ] **Step 3: Write `components/sections/Work.tsx`**

```tsx
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Work`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add selected work section

Assisted by AI"
```

---

## Task 13: Contact section + Footer

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `components/sections/Footer.tsx`
- Test: `components/sections/__tests__/Contact.test.tsx`

- [ ] **Step 1: Write the failing test `components/sections/__tests__/Contact.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

describe("Contact", () => {
  it("renders a mailto email link", () => {
    render(<Contact />);
    const email = screen.getByRole("link", { name: /email me/i });
    expect(email).toHaveAttribute("href", "mailto:lenkasasmita94@gmail.com");
  });

  it("renders LinkedIn and Résumé but not GitHub", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/sasmita-lenka",
    );
    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/sasmita-lenka-resume.pdf",
    );
    expect(screen.queryByText(/github/i)).toBeNull();
  });
});

describe("Footer", () => {
  it("shows Bangalore, India and not Odisha", () => {
    render(<Footer />);
    expect(screen.getByText(/Bangalore, India/)).toBeInTheDocument();
    expect(screen.queryByText(/Odisha/)).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Contact`
Expected: FAIL.

- [ ] **Step 3: Write `components/sections/Contact.tsx`**

```tsx
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
```

- [ ] **Step 4: Write `components/sections/Footer.tsx`**

```tsx
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
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- Contact`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add contact section and footer

Assisted by AI"
```

---

## Task 14: Assemble the page

**Files:**
- Modify: `app/page.tsx`
- Test: `app/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test `app/__tests__/page.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders all section anchors in order", () => {
    const { container } = render(<Home />);
    const ids = Array.from(container.querySelectorAll("section[id]")).map((s) => s.id);
    expect(ids).toEqual(["top", "about", "skills", "experience", "work", "contact"]);
  });

  it("renders exactly one h1", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- page`
Expected: FAIL (default scaffold page has no matching sections).

- [ ] **Step 3: Write `app/page.tsx`**

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run the test and the build**

Run: `npm test -- page`
Expected: PASS.
Run: `npm run build`
Expected: build succeeds, `/` is static.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble single-page layout

Assisted by AI"
```

---

## Task 15: Resume asset

**Files:**
- Create: `public/sasmita-lenka-resume.pdf` (copied from the full-stack source resume)
- Test: `public/__tests__/resume.test.ts`

- [ ] **Step 1: Copy the canonical resume into `public/`**

The full-stack version is canonical for download. Source files are in the repo root.

```bash
cp "Sasmita_Lenka_FS.pdf" public/sasmita-lenka-resume.pdf
```

- [ ] **Step 2: Write a test asserting the asset exists `public/__tests__/resume.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

describe("resume asset", () => {
  it("exists and is non-empty", () => {
    const p = resolve(process.cwd(), "public/sasmita-lenka-resume.pdf");
    expect(existsSync(p)).toBe(true);
    expect(statSync(p).size).toBeGreaterThan(1000);
  });
});
```

- [ ] **Step 3: Run the test**

Run: `npm test -- resume`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A public/sasmita-lenka-resume.pdf
git commit -m "chore: add downloadable resume asset

Assisted by AI"
```

---

## Task 16: SEO metadata + JSON-LD

**Files:**
- Create: `lib/seo.ts`
- Create: `components/JsonLd.tsx`
- Modify: `app/layout.tsx`
- Test: `lib/__tests__/seo.test.ts`

- [ ] **Step 1: Write the failing test `lib/__tests__/seo.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { siteMetadata, personJsonLd, SITE_URL } from "@/lib/seo";

describe("seo", () => {
  it("has a title and description", () => {
    expect(String(siteMetadata.title)).toMatch(/Sasmita Lenka/);
    expect(siteMetadata.description).toMatch(/payment/i);
  });

  it("sets an absolute metadataBase", () => {
    expect(siteMetadata.metadataBase?.toString()).toBe(`${SITE_URL}/`);
  });

  it("builds Person JSON-LD with linkedin sameAs and no Odisha", () => {
    expect(personJsonLd["@type"]).toBe("Person");
    expect(personJsonLd.name).toBe("Sasmita Lenka");
    expect(personJsonLd.sameAs).toContain("https://linkedin.com/in/sasmita-lenka");
    expect(JSON.stringify(personJsonLd).toLowerCase()).not.toContain("odisha");
    expect(JSON.stringify(personJsonLd).toLowerCase()).not.toContain("github");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- seo`
Expected: FAIL, cannot resolve `@/lib/seo`.

- [ ] **Step 3: Write `lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sasmitalenka.com";

const title = `${profile.name} - ${profile.role}`;
const description = profile.summary;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: `${profile.role}, ${profile.focus}`,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
  sameAs: [profile.linkedin],
  knowsAbout: skillGroups.flatMap((g) => g.items),
} as const;
```

Note: `title` uses a plain hyphen, not an em dash, to honor the no-em-dash rule across all copy.

- [ ] **Step 4: Write `components/JsonLd.tsx`**

```tsx
import { personJsonLd } from "@/lib/seo";

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
  );
}
```

- [ ] **Step 5: Update `app/layout.tsx`** to use `siteMetadata` and render `<JsonLd />`

```tsx
import { fraunces, inter } from "@/app/fonts";
import { siteMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Run the test and build**

Run: `npm test -- seo`
Expected: PASS.
Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add SEO metadata and Person JSON-LD

Assisted by AI"
```

---

## Task 17: Sitemap + robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Test: `app/__tests__/sitemap-robots.test.ts`

- [ ] **Step 1: Write the failing test `app/__tests__/sitemap-robots.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { SITE_URL } from "@/lib/seo";

describe("sitemap", () => {
  it("lists the home URL", () => {
    const entries = sitemap();
    expect(entries[0].url).toBe(`${SITE_URL}`);
  });
});

describe("robots", () => {
  it("allows all and points to the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- sitemap-robots`
Expected: FAIL.

- [ ] **Step 3: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
```

- [ ] **Step 4: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Run the test**

Run: `npm test -- sitemap-robots`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add sitemap and robots

Assisted by AI"
```

---

## Task 18: OpenGraph image

**Files:**
- Create: `app/opengraph-image.tsx`
- Test: `app/__tests__/opengraph-image.test.ts`

The OG image is generated at build time with `next/og` `ImageResponse`. It uses the warm editorial palette (paper background, ink text, terracotta accent) and the headline, so social shares match the site. The default export returns an `ImageResponse`, which is hard to assert pixel-for-pixel in jsdom, so the test only checks the exported metadata (`size`, `contentType`, `alt`).

- [ ] **Step 1: Write the failing test `app/__tests__/opengraph-image.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { size, contentType, alt } from "@/app/opengraph-image";

describe("opengraph-image", () => {
  it("declares a 1200x630 PNG with descriptive alt", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt.toLowerCase()).toContain("sasmita lenka");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- opengraph-image`
Expected: FAIL, cannot resolve `@/app/opengraph-image`.

- [ ] **Step 3: Write `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { palette } from "@/lib/theme";

export const alt = `${profile.name} - ${profile.role}, ${profile.focus}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { headline, role, focus, name } = profile;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: palette.paper,
          color: palette.ink,
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: palette.accent,
          }}
        >
          {role} · {focus}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.0 }}>
          <span>
            {headline.lead}{" "}
            <span style={{ color: palette.accent, fontStyle: "italic" }}>{headline.emphasis}</span>
          </span>
          <span>{headline.trail}</span>
        </div>
        <div style={{ fontSize: 30, color: palette.muted }}>{name}</div>
      </div>
    ),
    { ...size },
  );
}
```

Note: `app/opengraph-image.tsx` uses JSX in a `.tsx` file, so the Vitest test imports only the named exports (`size`, `contentType`, `alt`); it does not call the default function, which would require the edge image runtime.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- opengraph-image`
Expected: PASS.

- [ ] **Step 5: Build to confirm the OG route compiles**

Run: `npm run build`
Expected: build succeeds; `/opengraph-image` route appears in the output.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add generated OpenGraph image

Assisted by AI"
```

---

## Task 19: Accessibility and motion polish

This task adds the skip link, a reduced-motion-aware scroll reveal, and a mobile menu. Each piece is its own component with a focused test, so the section stays bite-sized.

### 19a: Skip link

**Files:**
- Create: `components/ui/SkipLink.tsx`
- Modify: `app/layout.tsx`
- Test: `components/ui/__tests__/SkipLink.test.tsx`

- [ ] **Step 1: Write the failing test `components/ui/__tests__/SkipLink.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "@/components/ui/SkipLink";

describe("SkipLink", () => {
  it("links to the main content anchor", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: /skip to content/i });
    expect(link).toHaveAttribute("href", "#top");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- SkipLink`
Expected: FAIL, cannot resolve `@/components/ui/SkipLink`.

- [ ] **Step 3: Write `components/ui/SkipLink.tsx`**

```tsx
export function SkipLink() {
  return (
    <a
      href="#top"
      className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}
```

- [ ] **Step 4: Render it first in `app/layout.tsx` body**

Add the import and place `<SkipLink />` as the first child of `<body>`:

```tsx
import { fraunces, inter } from "@/app/fonts";
import { siteMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { SkipLink } from "@/components/ui/SkipLink";
import "./globals.css";

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SkipLink />
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Run the test**

Run: `npm test -- SkipLink`
Expected: PASS.

### 19b: Reveal on scroll (reduced-motion aware)

**Files:**
- Create: `components/ui/Reveal.tsx`
- Test: `components/ui/__tests__/Reveal.test.tsx`

- [ ] **Step 6: Write the failing test `components/ui/__tests__/Reveal.test.tsx`**

The IntersectionObserver and matchMedia mocks are already registered in `vitest.setup.ts`. The default matchMedia mock returns `matches: false`, so reduced motion is off in tests; the component must still render its children regardless of observer state.

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/ui/Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>visible content</p>
      </Reveal>,
    );
    expect(screen.getByText("visible content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run the test to verify it fails**

Run: `npm test -- Reveal`
Expected: FAIL, cannot resolve `@/components/ui/Reveal`.

- [ ] **Step 8: Write `components/ui/Reveal.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      className="transition-all duration-700 ease-out motion-reduce:transition-none data-[shown=false]:translate-y-4 data-[shown=false]:opacity-0 data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100"
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 9: Run the test to verify it passes**

Run: `npm test -- Reveal`
Expected: PASS.

- [ ] **Step 10: Wrap each main section in `app/page.tsx` with `Reveal`**

`Reveal` renders a wrapper `div` around each section, so the `section[id]` order assertion in `app/__tests__/page.test.tsx` still holds. Update `app/page.tsx`:

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Work />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 11: Run the page test to confirm order is preserved**

Run: `npm test -- page`
Expected: PASS (section ids still `["top","about","skills","experience","work","contact"]`).

### 19c: Mobile menu

**Files:**
- Create: `components/sections/MobileMenu.tsx`
- Modify: `components/sections/Nav.tsx`
- Test: `components/sections/__tests__/MobileMenu.test.tsx`

- [ ] **Step 12: Write the failing test `components/sections/__tests__/MobileMenu.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenu } from "@/components/sections/MobileMenu";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

describe("MobileMenu", () => {
  it("toggles the menu open and shows links", () => {
    render(<MobileMenu links={links} />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
  });
});
```

- [ ] **Step 13: Run the test to verify it fails**

Run: `npm test -- MobileMenu`
Expected: FAIL, cannot resolve `@/components/sections/MobileMenu`.

- [ ] **Step 14: Write `components/sections/MobileMenu.tsx`**

```tsx
"use client";

import { useState } from "react";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-full border border-hairline px-3 py-1.5 text-sm font-medium"
      >
        Menu
      </button>
      {open && (
        <ul
          id="mobile-menu"
          className="absolute left-0 right-0 top-full mt-2 flex flex-col gap-1 border-y border-hairline bg-paper px-6 py-4"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block cursor-pointer py-2 text-base text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 15: Wire `MobileMenu` into `Nav.tsx`**

Share the existing nav links array with `MobileMenu`. In `components/sections/Nav.tsx`, hide the inline link list below the `sm` breakpoint (`hidden sm:flex`) and render `<MobileMenu links={navLinks} />` alongside it. Use the same `navLinks` array the desktop list maps over (define it once at module scope and pass it to `MobileMenu`). The `Résumé` button and the `Available` dot stay visible at all sizes. Keep the existing Nav test passing (desktop links remain in the DOM via the `hidden sm:flex` list).

- [ ] **Step 16: Run the Nav and MobileMenu tests**

Run: `npm test -- Nav MobileMenu`
Expected: PASS for both.

- [ ] **Step 17: Commit the polish set**

```bash
git add -A
git commit -m "feat: add skip link, scroll reveal, and mobile menu

Assisted by AI"
```

- [ ] **Step 18: Manual responsive and a11y pass**

Run `npm run dev` and verify in the browser:
- At 360px, 768px, 1280px: no horizontal scroll; hero headline wraps cleanly; mobile menu toggles.
- Keyboard: Tab from page load reveals the skip link first; all links and buttons show a visible `focus-visible` ring; tab order is logical.
- Toggle OS reduced-motion: sections appear instantly with no transform animation.
- Confirm `cursor: pointer` on every link and button.

No commit needed unless a fix is required; if so, commit with a `fix:` message.

---

## Task 20: Final quality gate and deploy

**Files:**
- None created; this is a verification and deploy gate.

- [ ] **Step 1: Run the full test suite**

Run: `npm test -- --run`
Expected: all tests pass.

- [ ] **Step 2: Lint and typecheck**

Run: `npm run lint`
Expected: no errors.
Run: `npx tsc --noEmit`
Expected: no type errors.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: build succeeds; `/` is static; `/opengraph-image`, `/sitemap.xml`, `/robots.txt` routes are present.

- [ ] **Step 4: Lighthouse spot check**

Run `npm run build && npm run start`, open the site, and run Lighthouse (or `npx unlighthouse --site http://localhost:3000`). Target 95+ for Performance, Accessibility, Best Practices, and SEO. Note any sub-95 category and fix the root cause (do not silence warnings).

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final quality pass

Assisted by AI"
```

- [ ] **Step 6: Deploy to Vercel**

```bash
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` in the Vercel project to the production URL so canonical, OpenGraph, sitemap, and robots all emit absolute URLs. Re-deploy after setting it. Custom domain is an open item in the spec and can be attached later.

---

## Self-Review

Reviewed the plan against `docs/superpowers/specs/2026-05-30-sasmita-portfolio-design.md`.

**1. Spec coverage**

| Spec requirement | Task |
|---|---|
| Next.js + TypeScript + Tailwind v4 scaffold | 1 |
| Test harness (Vitest + RTL) | 2 |
| Typed content modules, content rules enforced | 3 |
| Design tokens + self-hosted Fraunces/Inter | 4 |
| Button, Tag, SectionHeading, MetricStat primitives | 5, 6 |
| Nav (sticky, Available dot, Résumé, no GitHub) | 7 |
| Hero (kicker, headline, 2 CTAs, metrics) | 8 |
| About (01), Skills (02), Experience (03), Work (04), Contact (05), Footer | 9-13 |
| Single-page assembly, one h1, anchor order | 14 |
| Résumé PDF in public | 15 |
| Metadata API, OpenGraph, Twitter, Person JSON-LD | 16 |
| sitemap.xml + robots.txt | 17 |
| Generated OG image in warm editorial style | 18 |
| A11y skip link, focus-visible, reduced motion, mobile menu, responsive | 19 |
| Lighthouse 95+ gate, Vercel deploy | 20 |

Content rules (no Odisha, MCA-only 2020-2022, no GitHub, Email/LinkedIn/Résumé only, no em dashes) are enforced by unit tests in Task 3 and Task 16, not left to manual discipline.

**2. Placeholder scan**

No `TBD`, `TODO`, or "implement later" steps. Every code step shows full code. Task 19c Step 15 describes a Nav edit in prose rather than a full rewrite; the existing Nav code lives in Task 7, and the change (extract `navLinks` to module scope, add `hidden sm:flex`, render `<MobileMenu links={navLinks} />`) is precise enough to apply without ambiguity.

**3. Type consistency**

- `profile` shape (`headline.lead/emphasis/trail`, `metrics[].value/label`, `role`, `focus`, `summary`, `resumeUrl`, `email`, `linkedin`, `name`) is defined in Task 3 and used identically in Tasks 8, 16, 18.
- `skillGroups[].items` used in Tasks 10 and 16 (`knowsAbout`).
- `palette` from `lib/theme.ts` (Task 4) reused in Task 18.
- `SITE_URL`, `siteMetadata`, `personJsonLd` (Task 16) reused in Task 17.
- `MobileMenu` prop `links: { href; label }[]` matches the `navLinks` array shape from Task 7.

No naming drift found.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-30-sasmita-portfolio.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints for review.

Which approach?
