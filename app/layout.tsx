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
