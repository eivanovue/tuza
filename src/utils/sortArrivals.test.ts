import sortArrivals from "./sortArrivals";
import { ArrivalListType } from "../types";

describe("sortArrivals", () => {
  const arrivals: ArrivalListType = [
    { 
      stationName: "Station A",
      platformName: "Platform 1",
      direction: "North",
      currentLocation: "Location A",
      towards: "Destination A",
      expectedArrival: "2024-03-25T08:00:00" 
    },
    { 
      stationName: "Station B",
      platformName: "Platform 2",
      direction: "South",
      currentLocation: "Location B",
      towards: "Destination B",
      expectedArrival: "2024-03-25T07:30:00" 
    },
    { 
      stationName: "Station C",
      platformName: "Platform 3",
      direction: "East",
      currentLocation: "Location C",
      towards: "Destination C",
      expectedArrival: "2024-03-25T09:15:00" 
    },
    { 
      stationName: "Station D",
      platformName: "Platform 4",
      direction: "West",
      currentLocation: "Location D",
      towards: "Destination D",
      expectedArrival: "2024-03-25T07:45:00" 
    },
  ];

  it("should sort arrivals by expected arrival time", () => {
    const sortedArrivals = sortArrivals(arrivals);
    const expectedOrder = [
      "Station B", "Station D", "Station A", "Station C"
    ];
    const receivedOrder = sortedArrivals.map(arrival => arrival.stationName);
    expect(receivedOrder).toEqual(expectedOrder);
  });

  it("should return an empty array if provided with an empty array", () => {
    const emptyArrivals: ArrivalListType = [];
    const sortedArrivals = sortArrivals(emptyArrivals);
    expect(sortedArrivals).toEqual([]);
  });

  it("should not modify the original array", () => {
    const originalArrivals = [...arrivals];
    sortArrivals(arrivals);
    expect(arrivals).toEqual(originalArrivals);
  });

  it("should handle arrivals with the same expected arrival time", () => {
    const customArrivals: ArrivalListType = [
      { 
        stationName: "Station X",
        platformName: "Platform X",
        direction: "North",
        currentLocation: "Location X",
        towards: "Destination X",
        expectedArrival: "2024-03-25T08:00:00" 
      },
      { 
        stationName: "Station Y",
        platformName: "Platform Y",
        direction: "South",
        currentLocation: "Location Y",
        towards: "Destination Y",
        expectedArrival: "2024-03-25T08:00:00" 
      },
      { 
        stationName: "Station Z",
        platformName: "Platform Z",
        direction: "East",
        currentLocation: "Location Z",
        towards: "Destination Z",
        expectedArrival: "2024-03-25T08:00:00" 
      },
    ];
    const sortedArrivals = sortArrivals(customArrivals);
    expect(sortedArrivals[0].stationName).toBe("Station X");
    expect(sortedArrivals[1].stationName).toBe("Station Y");
    expect(sortedArrivals[2].stationName).toBe("Station Z");
  });
});
