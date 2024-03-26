import { Box } from "@mui/material";
import { LineListType } from "../../types";
import Line from "../Line";

const LineList = ({ lines }: { lines: LineListType }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      {lines.map((line) => (
        <Line data-testid="line" key={line.id} {...line} />
      ))}
    </Box>
  );
};

export default LineList;
