import { StationListType } from "../types";

const sortStations = (stations: StationListType) => {
  return stations.sort((a, b) => a.name.localeCompare(b.name));
}

export default sortStations;