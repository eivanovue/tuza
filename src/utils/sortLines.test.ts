import sortLines from "./sortLines";
import { LineType } from "../types";

describe("sortLines", () => {
  const lines: LineType[] = [
    {
      id: "bakerloo",
      status: "Good Service",
      statusSeverity: 10,
      name: "Bakerloo",
      statusText: "All lines are running smoothly",
    },
    {
      id: "central",
      status: "Minor Delays",
      statusSeverity: 15,
      name: "Central",
      statusText: "Some delays reported",
    },
    {
      id: "district",
      status: "Good Service",
      statusSeverity: 10,
      name: "District",
      statusText: "All lines are running smoothly",
    },
    {
      id: "jubilee",
      status: "Severe Delays",
      statusSeverity: 20,
      name: "Jubilee",
      statusText: "Severe delays reported",
    },
    {
      id: "northern",
      status: "Part Closure",
      statusSeverity: 25,
      name: "Northern",
      statusText: "Partial closure reported",
    },
  ];

  it("should sort lines by status severity", () => {
    const sortedLines = sortLines(lines);
    const expectedOrder = [
      "bakerloo",
      "district",
      "central",
      "jubilee",
      "northern",
    ];
    const receivedOrder = sortedLines.map((line) => line.id);
    expect(receivedOrder).toEqual(expectedOrder);
  });

  it("should maintain the original order if lines have the same status severity", () => {
    const customLines: LineType[] = [
      {
        id: "line1",
        status: "Good Service",
        statusSeverity: 10,
        name: "Line 1",
        statusText: "All lines are running smoothly",
      },
      {
        id: "line2",
        status: "Minor Delays",
        statusSeverity: 15,
        name: "Line 2",
        statusText: "Some delays reported",
      },
      {
        id: "line3",
        status: "Minor Delays",
        statusSeverity: 15,
        name: "Line 3",
        statusText: "Some delays reported",
      },
    ];
    const sortedLines = sortLines(customLines);
    expect(sortedLines[1].id).toBe("line2");
    expect(sortedLines[2].id).toBe("line3");
  });

  it("should return an empty array if provided with an empty array", () => {
    const emptyLines: LineType[] = [];
    const sortedLines = sortLines(emptyLines);
    expect(sortedLines).toEqual([]);
  });

  it("should not modify the original array", () => {
    const originalLines = [...lines];
    sortLines(lines);
    expect(lines).toEqual(originalLines);
  });
});
