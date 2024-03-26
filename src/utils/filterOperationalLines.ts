import operationalLineStatuses from "../constants/operationalLineStatuses";
import { LineListType } from "../types";

const filterOperationalLines = (lines: LineListType): LineListType => {
  return lines.filter((line) => operationalLineStatuses.includes(line.status));
}

export default filterOperationalLines