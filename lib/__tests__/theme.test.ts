import { describe, it, expect } from "vitest";
import { theme } from "@/lib/theme";

describe("theme tokens", () => {
  it("exposes the warm editorial palette", () => {
    expect(theme.paper).toBe("#faf6f0");
    expect(theme.ink).toBe("#2b2620");
    expect(theme.accent).toBe("#a84d28");
  });
});
