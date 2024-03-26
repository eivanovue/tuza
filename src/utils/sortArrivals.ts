import { ArrivalListType } from "../types";

const sortArrivals = (arrivals: ArrivalListType) => {
  return arrivals.sort(
    (a, b) =>
      new Date(a.expectedArrival).getTime() -
      new Date(b.expectedArrival).getTime()
  );
};

export default sortArrivals;
