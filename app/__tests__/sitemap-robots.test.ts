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
