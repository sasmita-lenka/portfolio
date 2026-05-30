# Sasmita Lenka - Portfolio

Single-page portfolio for Sasmita Lenka, Software Engineer (backend, full-stack, fintech/payments).

- **Live:** https://sasmitalenka.com
- **Repo:** https://github.com/sasmita-lenka/portfolio (private)
- **Host:** Vercel
- **Domain registrar / DNS:** GoDaddy

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` tokens)
- `next/font` (Fraunces display + Inter sans)
- Vitest + React Testing Library

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Watch-mode tests |

## Project structure

```
app/            App Router entry, layout, metadata, sitemap, robots, OG image, favicon
components/     UI primitives (ui/) and page sections (sections/)
content/        Profile, projects, experience, skills data
lib/            SEO metadata, JSON-LD, theme tokens
public/         Resume PDF and static assets
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin used for metadata, Open Graph, sitemap, and robots. Set to `https://sasmitalenka.com` in production. |

Falls back to `https://sasmitalenka.com` when unset.

## Deployment

Hosted on **Vercel**, deployed from the `master` branch of this repo.

1. Import `sasmita-lenka/portfolio` in the Vercel dashboard (framework auto-detected as Next.js).
2. Set `NEXT_PUBLIC_SITE_URL=https://sasmitalenka.com` in Project Settings, Environment Variables (Production).
3. Add the domain `sasmitalenka.com` in Project Settings, Domains.
4. Every push to `master` triggers a production deploy.

### Custom domain (GoDaddy)

DNS is managed at **GoDaddy**. Point the domain at Vercel using the records shown in the Vercel Domains tab. Standard values:

| Type | Name | Value |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Confirm the exact records in the Vercel dashboard before saving in GoDaddy; Vercel verifies and issues the TLS certificate automatically.
