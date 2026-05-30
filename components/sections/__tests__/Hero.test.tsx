import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the headline words", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Engineering trust in money.");
  });

  it("renders both CTAs", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /view work/i })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/sasmita-lenka-resume.pdf",
    );
  });

  it("renders four metrics", () => {
    render(<Hero />);
    expect(screen.getByText("2M+")).toBeInTheDocument();
    expect(screen.getByText("4+")).toBeInTheDocument();
  });
});
