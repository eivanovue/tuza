import arrivalMapper from "./arrivalMapper";
import { ArrivalType } from "../types";

describe("arrivalMapper", () => {
  it("should map arrival object correctly", () => {
    const arrival: ArrivalType = {
      stationName: "Station A",
      platformName: "Platform 1",
      direction: "North",
      currentLocation: "Location A",
      towards: "Destination A",
      expectedArrival: "2022-01-01T12:00:00Z",
    };

    const mappedArrival = arrivalMapper(arrival);

    expect(mappedArrival).toEqual(arrival);
  });
});
