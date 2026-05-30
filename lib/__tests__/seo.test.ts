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
