import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Arrivals from "./index";
import { ArrivalsGroupedType } from "../../types";

const arrivalsMock: ArrivalsGroupedType = {
  "Platform 1": [
    {
      stationName: "Station A",
      platformName: "Platform 1",
      direction: "North",
      towards: "Destination 1",
      currentLocation: "Location A",
      expectedArrival: "2024-04-01T08:00:00",
    },
    {
      stationName: "Station A",
      platformName: "Platform 1",
      direction: "South",
      towards: "Destination 2",
      currentLocation: "Location B",
      expectedArrival: "2024-04-01T08:15:00",
    },
  ],
  "Platform 2": [
    {
      stationName: "Station A",
      platformName: "Platform 2",
      direction: "West",
      towards: "Destination 3",
      currentLocation: "Location C",
      expectedArrival: "2024-04-01T08:30:00",
    },
    {
      stationName: "Station A",
      platformName: "Platform 2",
      direction: "East",
      towards: "Destination 4",
      currentLocation: "Location D",
      expectedArrival: "2024-04-01T08:45:00",
    },
  ],
};

describe("Arrivals component", () => {
  it("renders arrivals correctly", () => {
    const { getByText } = render(<Arrivals arrivals={arrivalsMock} lineId="1" />);
    
    expect(getByText("Platform 1")).toBeInTheDocument();
    expect(getByText("Platform 2")).toBeInTheDocument();

    expect(getByText("Destination 1")).toBeInTheDocument();
    expect(getByText("Location A")).toBeInTheDocument();
  });

  it("renders empty state if no arrivals", () => {
    const { queryByText } = render(<Arrivals arrivals={{}} lineId="1" />);
    expect(queryByText("Platform 1")).not.toBeInTheDocument();
    expect(queryByText("Platform 2")).not.toBeInTheDocument();
    expect(queryByText("DESTINATION")).not.toBeInTheDocument();
    expect(queryByText("DUE")).not.toBeInTheDocument();
  });
});
