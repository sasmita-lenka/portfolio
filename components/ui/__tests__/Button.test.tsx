import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders an anchor with href and label", () => {
    render(<Button href="#work">View work</Button>);
    const link = screen.getByRole("link", { name: "View work" });
    expect(link).toHaveAttribute("href", "#work");
  });

  it("applies the solid variant by default and ghost when asked", () => {
    const { rerender } = render(<Button href="#a">A</Button>);
    expect(screen.getByRole("link", { name: "A" }).className).toContain("bg-accent");
    rerender(
      <Button href="#b" variant="ghost">
        B
      </Button>,
    );
    expect(screen.getByRole("link", { name: "B" }).className).toContain("border-hairline");
  });

  it("uses cursor-pointer", () => {
    render(<Button href="#c">C</Button>);
    expect(screen.getByRole("link", { name: "C" }).className).toContain("cursor-pointer");
  });
});
