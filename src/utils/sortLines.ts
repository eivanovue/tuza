import { LineListType } from "../types";

const sortLines = (lines: LineListType): LineListType => {
  return lines.sort((a, b) => a.statusSeverity - b.statusSeverity);
};

export default sortLines;