import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenu } from "@/components/sections/MobileMenu";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

describe("MobileMenu", () => {
  it("toggles the menu open and shows links", () => {
    render(<MobileMenu links={links} />);
    const toggle = screen.getByRole("button", { name: /menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#work");
  });
});
