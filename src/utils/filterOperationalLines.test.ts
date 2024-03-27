import filterOperationalLines from "./filterOperationalLines";
import { LineType } from "../types";

describe("filterOperationalLines", () => {
  const lines: LineType[] = [
    {
      id: "1",
      name: "Line 1",
      status: "Good Service",
      statusText: "",
      statusSeverity: 1,
    },
    {
      id: "2",
      name: "Line 2",
      status: "Minor Delays",
      statusText: "",
      statusSeverity: 2,
    },
    {
      id: "3",
      name: "Line 3",
      status: "Severe Delays",
      statusText: "",
      statusSeverity: 3,
    },
    {
      id: "4",
      name: "Line 4",
      status: "Part Closure",
      statusText: "",
      statusSeverity: 4,
    },
    {
      id: "5",
      name: "Line 5",
      status: "Planned Closure",
      statusText: "",
      statusSeverity: 5,
    },
    {
      id: "6",
      name: "Line 6",
      status: "Service Closed",
      statusText: "",
      statusSeverity: 6,
    },
    {
      id: "7",
      name: "Line 7",
      status: "Part Suspended",
      statusText: "",
      statusSeverity: 7,
    },
    {
      id: "8",
      name: "Line 8",
      status: "Planned Closure",
      statusText: "",
      statusSeverity: 8,
    },
    {
      id: "9",
      name: "Line 9",
      status: "Good Service",
      statusText: "",
      statusSeverity: 9,
    },
  ];

  it("should filter operational lines", () => {
    const filteredLines = filterOperationalLines(lines);
    expect(filteredLines).toEqual([
      {
        id: "1",
        name: "Line 1",
        status: "Good Service",
        statusText: "",
        statusSeverity: 1,
      },
      {
        id: "2",
        name: "Line 2",
        status: "Minor Delays",
        statusText: "",
        statusSeverity: 2,
      },
      {
        id: "3",
        name: "Line 3",
        status: "Severe Delays",
        statusText: "",
        statusSeverity: 3,
      },
      {
        id: "4",
        name: "Line 4",
        status: "Part Closure",
        statusText: "",
        statusSeverity: 4,
      },
      {
        id: "7",
        name: "Line 7",
        status: "Part Suspended",
        statusText: "",
        statusSeverity: 7,
      },
      {
        id: "9",
        name: "Line 9",
        status: "Good Service",
        statusText: "",
        statusSeverity: 9,
      },
    ]);
  });

  it("should return an empty array if no operational lines are found", () => {
    const nonOperationalLines: LineType[] = [
      {
        id: "10",
        name: "Line 10",
        status: "Closed",
        statusText: "",
        statusSeverity: 10,
      },
      {
        id: "11",
        name: "Line 11",
        status: "Suspended",
        statusText: "",
        statusSeverity: 11,
      },
    ];
    const filteredLines = filterOperationalLines(nonOperationalLines);
    expect(filteredLines).toEqual([]);
  });

  it("should handle an empty array input", () => {
    const filteredLines = filterOperationalLines([]);
    expect(filteredLines).toEqual([]);
  });

  it("should handle an array with a single line", () => {
    const singleLine: LineType[] = [
      {
        id: "12",
        name: "Line 12",
        status: "Good Service",
        statusText: "",
        statusSeverity: 12,
      },
    ];
    const filteredLines = filterOperationalLines(singleLine);
    expect(filteredLines).toEqual(singleLine);
  });
});
