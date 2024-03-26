import lineColors from "../constants/lineColors";

const mapLineColor = (lineId: string | undefined) => {
  const lineColor = lineColors.find((line) => line.id === lineId);
  return lineColor ? lineColor.color : "#607D8B";
}

export default mapLineColor;