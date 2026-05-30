import { describe, it, expect } from "vitest";
import { size, contentType, alt } from "@/app/opengraph-image";

describe("opengraph-image", () => {
  it("declares a 1200x630 PNG with descriptive alt", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt.toLowerCase()).toContain("sasmita lenka");
  });
});
