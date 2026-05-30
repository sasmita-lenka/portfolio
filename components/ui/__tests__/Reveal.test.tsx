import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/ui/Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>visible content</p>
      </Reveal>,
    );
    expect(screen.getByText("visible content")).toBeInTheDocument();
  });
});
