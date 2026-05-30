import { describe, it, expect } from "vitest";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";

const blob = JSON.stringify({ profile, skillGroups, experience, projects }).toLowerCase();

describe("content rules", () => {
  it("never mentions Odisha", () => {
    expect(blob).not.toContain("odisha");
  });
  it("never mentions GitHub", () => {
    expect(blob).not.toContain("github");
  });
  it("uses Bangalore, India for location", () => {
    expect(profile.location).toBe("Bangalore, India");
  });
  it("has the correct email and linkedin", () => {
    expect(profile.email).toBe("lenkasasmita94@gmail.com");
    expect(profile.linkedin).toBe("https://linkedin.com/in/sasmita-lenka");
  });
  it("exposes exactly four headline metrics", () => {
    expect(profile.metrics).toHaveLength(4);
  });
  it("includes the MCA education entry dated 2020 to 2022", () => {
    const mca = experience.find((e) => e.kind === "education");
    expect(mca).toBeDefined();
    expect(mca?.period).toBe("2020 - 2022");
  });
  it("has four selected projects", () => {
    expect(projects).toHaveLength(4);
  });
  it("contains no em dashes in copy", () => {
    expect(blob).not.toContain("—");
  });
});
