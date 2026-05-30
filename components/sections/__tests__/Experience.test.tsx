import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Experience } from "@/components/sections/Experience";

describe("Experience", () => {
  it("renders inside an #experience section", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("section#experience")).not.toBeNull();
  });

  it("renders roles and the MCA entry", () => {
    render(<Experience />);
    expect(screen.getByText("Module Lead")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
    expect(screen.getByText("Master of Computer Application")).toBeInTheDocument();
    expect(screen.getByText("2020 - 2022")).toBeInTheDocument();
  });
});
