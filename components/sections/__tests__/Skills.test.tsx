import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "@/components/sections/Skills";

describe("Skills", () => {
  it("renders inside a #skills section", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("section#skills")).not.toBeNull();
  });

  it("renders group labels and tags", () => {
    render(<Skills />);
    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.getByText("ISO 8583")).toBeInTheDocument();
    expect(screen.getByText("Spring Boot")).toBeInTheDocument();
  });
});
