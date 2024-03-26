import { ArrivalType } from "../types";


const arrivalMapper = (arrival: ArrivalType): ArrivalType => ({
    stationName: arrival.stationName,
    platformName: arrival.platformName,
    direction: arrival.direction,
    currentLocation: arrival.currentLocation,
    towards: arrival.towards,
    expectedArrival: arrival.expectedArrival,
});

export default arrivalMapper;