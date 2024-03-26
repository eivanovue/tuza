import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, RenderResult } from "@testing-library/react";
import LineList from "./index";
import { LineListType } from "../../types";

describe("LineList component", () => {
  const lines: LineListType = [
    {
      id: "bakerloo",
      name: "Bakerloo",
      status: "Good Service",
      statusText: "All lines are running smoothly",
      statusSeverity: 10,
    },
    {
      id: "piccadilly",
      name: "Piccadilly",
      status: "Minor Delays",
      statusText: "Minor delays clockwise due to an earlier faulty train at Baker Street.",
      statusSeverity: 10,
    },
  ];

  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <Router>
        <LineList lines={lines} />
      </Router>
    );
  });

  it("renders all lines correctly", () => {
    lines.forEach((line) => {
      const nameElement = component.getByText(line.name);
      const statusElement = component.getByText(line.status);
      expect(nameElement).toBeInTheDocument();
      expect(statusElement).toBeInTheDocument();
    });
  });

  it("renders correct number of lines", () => {
    const lineElements = component.getAllByTestId("line");
    expect(lineElements).toHaveLength(lines.length);
  });
});
