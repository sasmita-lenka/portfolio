import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

describe("Contact", () => {
  it("renders a mailto email link", () => {
    render(<Contact />);
    const email = screen.getByRole("link", { name: /email me/i });
    expect(email).toHaveAttribute("href", "mailto:lenkasasmita94@gmail.com");
  });

  it("renders LinkedIn and Résumé but not GitHub", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/sasmita-lenka",
    );
    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/sasmita-lenka-resume.pdf",
    );
    expect(screen.queryByText(/github/i)).toBeNull();
  });
});

describe("Footer", () => {
  it("shows Bangalore, India and not Odisha", () => {
    render(<Footer />);
    expect(screen.getByText(/Bangalore, India/)).toBeInTheDocument();
    expect(screen.queryByText(/Odisha/)).toBeNull();
  });
});
