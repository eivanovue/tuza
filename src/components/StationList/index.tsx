import { Box } from "@mui/material";
import Station from "../Station";
import { StationListType } from "../../types";

const StationList = ({ stations }: { stations: StationListType }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "left",
        gap: 2,
        width: "100%",
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 2,
      }}
    >
      {stations.map((station) => (
        <Box sx={{ width: "45%" }} key={station.id}>
          <Station {...station} />
        </Box>
      ))}
    </Box>
  );
};

export default StationList;
