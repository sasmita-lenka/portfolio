import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Work } from "@/components/sections/Work";

describe("Work", () => {
  it("renders inside a #work section", () => {
    const { container } = render(<Work />);
    expect(container.querySelector("section#work")).not.toBeNull();
  });

  it("renders all four projects with codes", () => {
    render(<Work />);
    expect(screen.getByText(/Micro ATM/)).toBeInTheDocument();
    expect(screen.getByText(/Point of Sale/)).toBeInTheDocument();
    expect(screen.getByText(/Aadhaar Payments/)).toBeInTheDocument();
    expect(screen.getByText(/Bharat Bill Payment/)).toBeInTheDocument();
  });
});
