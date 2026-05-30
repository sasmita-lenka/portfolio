# Sasmita Lenka Portfolio - Design Spec

Date: 2026-05-30
Status: Approved for planning

## Goal

Single-page portfolio for Sasmita Lenka, a Software Engineer specializing in fintech and payments. Primary objective: land a full-time role. The site must read as senior, distinctive, and credible to recruiters and engineers, while following modern frontend and SEO best practices.

## Person Summary

- Name: Sasmita Lenka
- Positioning: Software Engineer, Fintech and Payments (eligible for both frontend and backend roles)
- Experience: 4+ years
- Current: Module Lead, IServeU Technology Pvt. Ltd. (Nov 2022 to Present)
- Prior: Software Engineer Intern, IServeU (Apr 2022 to Nov 2022)
- Education: MCA, Biju Patnaik University of Technology, 2020 to 2022, CGPA 8.6 (MCA only on the site)
- Headline metrics: 2M+ daily transactions, +40% throughput, -30% latency, ~30% infra cost reduction, 100% on-time delivery
- Core: Java, Spring Boot, microservices, React.js, ISO 8583, AEPS, BBPS, MATM, POS, NPCI, UIDAI, PCI-DSS, AES-256, HSM, Kubernetes, Docker, CI/CD

### Content Rules (hard constraints)

- Location: use "Bangalore, India" or just "India". Never mention Odisha or any other state/city.
- Education: show MCA only. Other education stays on the resume, not the site.
- No GitHub link anywhere.
- Contact links: Email (mailto), LinkedIn, Résumé download. Nothing else.
- Email: lenkasasmita94@gmail.com
- LinkedIn: https://linkedin.com/in/sasmita-lenka
- Do not invent facts not present in the resume (e.g. education years were confirmed separately as 2020 to 2022).

## Tech Stack

- Framework: Next.js (latest stable, App Router) with TypeScript
- Styling: Tailwind CSS (latest stable) with design tokens in the theme config plus CSS variables
- Fonts: next/font, self-hosted. Fraunces (display serif) and Inter (body/UI)
- Structure: single page, anchor-scroll sections
- Contact: mailto link plus resume PDF download (no backend, no form service)
- Hosting: Vercel
- Skills to use during build: frontend-design and ui-ux-pro-max (UI), seo (technical SEO and metadata), content-research-writer (copy polish)

## Design Language: Warm Editorial Serif (Direction C)

Distinctive, magazine-like, restrained. Confident typography over decoration. Built on tokens so the accent, fonts, and spacing can be swapped later with low effort.

### Tokens

- Paper (background): `#faf6f0`
- Ink (text): `#2b2620`
- Muted (secondary text): `#7a7164`
- Accent (terracotta): `#b5562f`
- Hairline (borders): `#e7e0d4`
- Surface (cards/tags): `#ffffff`

Accent is a single token. Forest green (`#256a52`) and ink-only are pre-approved fallbacks if we revisit.

### Typography

- Display: Fraunces, weight 500/600, used for hero headline, section sub-headings, project titles, metric numbers. Italic Fraunces carries the accent emphasis word (e.g. "trust").
- Body/UI: Inter, weights 400/500/600.
- Hero headline scale: large (about 64 to 72px desktop), tight line-height, letter-spacing -0.02em.

### Visual System

- Generous whitespace, single hairline separators (no doubled bars, no boxed grids). This was an explicit correction from review.
- Numbered sections (01 to 05) with small uppercase labels.
- Buttons: pill shape (radius ~30px). Primary is solid terracotta on paper. Secondary is ghost with a soft hairline border.
- Interactive elements use `cursor: pointer` and clear hover and focus-visible states.
- Subtle, tasteful motion only (short fade/slide on scroll-in), gated behind `prefers-reduced-motion`.

## Page Structure (single-page scroll)

1. Nav (sticky): name wordmark left; anchor links (Work, About, Skills, Experience); "Available" status dot; Résumé button. Mobile: condensed menu.
2. Hero: kicker ("Software Engineer, Fintech and Payments"), headline "Engineering trust in money.", supporting line, two CTAs (View work, Download résumé), inline metrics row (2M+, 40%, 30%, 4+).
3. About (01): short editorial lead plus paragraph; three pillars (Payments core, Scale and DevOps, Security).
4. Skills (02): grouped rows (Languages, Frameworks, Backend, Databases, DevOps, Monitoring, Payments, Security) rendered as pill tags.
5. Experience (03): Module Lead and Software Engineer Intern (both IServeU, Bangalore, India), plus MCA. Concise achievement bullets with metric emphasis.
6. Selected Work (04): four projects (MATM, POS, AEPS, BBPS), each with one-line summary and tech tags.
7. Contact (05): large serif CTA ("Let's build something secure."), one line, links (Email, LinkedIn, Résumé).
8. Footer: copyright, "Bangalore, India", built-with note.

## Component Architecture

Each section is its own focused component under `components/sections/`. Shared primitives (Button, Tag, SectionHeading, MetricStat) under `components/ui/`. Design tokens centralized in the Tailwind theme and a `globals.css` variable block, so a re-theme touches one place. Content (bio, skills, experience, projects, metrics, links) lives in a typed `content/` data module, separate from markup, so copy edits do not touch components.

## Best Practices and Quality Bar

- Accessibility: semantic landmarks, logical heading order, `focus-visible` styles, accessible names on icon links, color contrast AA, keyboard navigable, respects reduced motion.
- Responsive: mobile-first, fluid type, tested at 360px, 768px, 1280px.
- Performance: self-hosted fonts with `display: swap`, no heavy libraries, minimal client JS (sections are mostly static/server components), optimized assets. Target Lighthouse 95+ across the board.
- Cursor pointer on all clickable elements (explicit user requirement).

## SEO

- Per-page metadata (title, description) via Next.js Metadata API.
- Open Graph and Twitter card with a generated OG image.
- JSON-LD `Person` structured data (name, jobTitle, sameAs LinkedIn, knowsAbout skills).
- `sitemap.xml` and `robots.txt`.
- Semantic HTML, descriptive section anchors, fast Core Web Vitals.
- Copy optimized for recruiter and ATS keywords (fintech, payments, Java, Spring Boot, microservices, React) using the content-research-writer and seo skills.

## Assets

- Resume PDF copied to `public/` with a clean filename (e.g. `sasmita-lenka-resume.pdf`). Use the full-stack version of the resume as canonical for download. Source files currently in project root.
- Favicon and an "SL" monogram derived from the wordmark.
- OG preview image generated to match the warm editorial style.

## Out of Scope (YAGNI)

- Blog or CMS
- Contact form backend or email service
- Dark mode (token system leaves the door open; not built now)
- GitHub link
- Multi-page routes
- Photo or headshot (typographic hero by design)

## Open Items

- Custom domain: decide before launch.
- Confirm which resume PDF is canonical for download (defaulting to the full-stack version).
