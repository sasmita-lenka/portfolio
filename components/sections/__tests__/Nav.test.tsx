import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/sections/Nav";

describe("Nav", () => {
  it("shows the wordmark and anchor links", () => {
    render(<Nav />);
    expect(screen.getByText("Sasmita Lenka")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /work/i })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "#about");
  });

  it("has a résumé download link", () => {
    render(<Nav />);
    const resume = screen.getByRole("link", { name: /résumé/i });
    expect(resume).toHaveAttribute("href", "/sasmita-lenka-resume.pdf");
  });

  it("does not render a GitHub link", () => {
    render(<Nav />);
    expect(screen.queryByText(/github/i)).toBeNull();
  });
});
