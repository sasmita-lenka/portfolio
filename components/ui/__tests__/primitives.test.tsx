import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tag } from "@/components/ui/Tag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MetricStat } from "@/components/ui/MetricStat";

describe("Tag", () => {
  it("renders its label", () => {
    render(<Tag>Java</Tag>);
    expect(screen.getByText("Java")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders the number and title as a level-2 heading", () => {
    render(<SectionHeading number="01" title="About" />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeInTheDocument();
  });
});

describe("MetricStat", () => {
  it("renders value and label", () => {
    render(<MetricStat value="2M+" label="Daily transactions" />);
    expect(screen.getByText("2M+")).toBeInTheDocument();
    expect(screen.getByText("Daily transactions")).toBeInTheDocument();
  });
});
