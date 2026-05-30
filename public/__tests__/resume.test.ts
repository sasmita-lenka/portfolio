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
