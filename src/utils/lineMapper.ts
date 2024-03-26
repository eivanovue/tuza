import { LineResponse, LineType } from "../types";

const lineMapper = (line: LineResponse): LineType => {
  const {
    id,
    name,
    lineStatuses: [lineStatus],
  } = line;

  const [validityPeriod] = lineStatus.validityPeriods;

  return {
    id,
    name,
    status: lineStatus.statusSeverityDescription,
    statusText: lineStatus.reason,
    statusSeverity: lineStatus.statusSeverity,
    ...(!!validityPeriod && {
      fromDate: validityPeriod.fromDate,
      toDate: validityPeriod.toDate,
    }),
  };
};

export default lineMapper;
