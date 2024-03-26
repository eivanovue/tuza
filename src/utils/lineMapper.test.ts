import lineMapper from "./lineMapper";
import { LineType, LineResponse } from "../types";

describe("lineMapper", () => {
  const lineResponse: LineResponse = {
    id: "bakerloo",
    name: "Bakerloo",
    lineStatuses: [
      {
        statusSeverity: 10,
        statusSeverityDescription: "Good Service",
        reason: "All lines are running smoothly",
        validityPeriods: [
          {
            fromDate: "2024-03-25T00:00:00",
            toDate: "2024-03-26T00:00:00",
          },
        ],
      },
    ],
  };

  it("should map line response to line type correctly", () => {
    const mappedLine: LineType = lineMapper(lineResponse);
    const expectedLine: LineType = {
      id: "bakerloo",
      name: "Bakerloo",
      status: "Good Service",
      statusText: "All lines are running smoothly",
      statusSeverity: 10,
      fromDate: "2024-03-25T00:00:00",
      toDate: "2024-03-26T00:00:00",
    };
    expect(mappedLine).toEqual(expectedLine);
  });

  it("should map line response without validity period", () => {
    const lineResponseWithoutValidity: LineResponse = {
      id: "bakerloo",
      name: "Bakerloo",
      lineStatuses: [
        {
          statusSeverity: 5,
          statusSeverityDescription: "Severe Delays",
          reason: "There are severe delays",
          validityPeriods: [],
        },
      ],
    };
    const mappedLine: LineType = lineMapper(lineResponseWithoutValidity);
    const expectedLine: LineType = {
      id: "bakerloo",
      name: "Bakerloo",
      status: "Severe Delays",
      statusText: "There are severe delays",
      statusSeverity: 5,
    };
    expect(mappedLine).toEqual(expectedLine);
  });

  it("should map line response without validity period to line type correctly", () => {
    const lineResponseWithoutValidity: LineResponse = {
      id: "bakerloo",
      name: "Bakerloo",
      lineStatuses: [
        {
          statusSeverity: 5,
          statusSeverityDescription: "Severe Delays",
          reason: "There are severe delays",
          validityPeriods: [],
        },
      ],
    };
    const mappedLine: LineType = lineMapper(lineResponseWithoutValidity);
    const expectedLine: LineType = {
      id: "bakerloo",
      name: "Bakerloo",
      status: "Severe Delays",
      statusText: "There are severe delays",
      statusSeverity: 5,
    };
    expect(mappedLine).toEqual(expectedLine);
  });
});
