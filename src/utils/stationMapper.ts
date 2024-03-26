import { StationResponse, StationType } from "../types";

const stationMapper = (
  station: StationResponse,
  lineId: string
): StationType => {
  const thingsToReplace: string[] = [
    "Underground Station",
    "(Circle Line)",
    "(H&C Line)",
    "(H&C Line)Underground",
    " -Underground",
    "(Central)",
    "(Bakerloo)",
    "(Dist&Picc Line)",
  ];

  let stationName = station.commonName;

  thingsToReplace.forEach((thing) => {
    stationName = stationName.replace(thing, "");
  });

  return {
    id: station.naptanId,
    name: stationName,
    lineId,
  };
};

export default stationMapper;
