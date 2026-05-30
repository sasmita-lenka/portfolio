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
