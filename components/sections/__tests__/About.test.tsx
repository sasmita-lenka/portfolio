import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/About";

describe("About", () => {
  it("renders inside an #about section", () => {
    const { container } = render(<About />);
    expect(container.querySelector("section#about")).not.toBeNull();
  });

  it("renders the three pillars", () => {
    render(<About />);
    expect(screen.getByText("Payments core")).toBeInTheDocument();
    expect(screen.getByText("Scale & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
  });
});
