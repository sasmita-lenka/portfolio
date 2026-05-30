import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sasmitalenka.com";

const title = `${profile.name} - ${profile.role}`;
const description = profile.summary;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
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
