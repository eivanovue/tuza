import { Box, Typography } from "@mui/material";
import { ArrivalsGroupedType } from "../../types";
import mapLineColor from "../../utils/mapLineColor";
import calculateCountdown from "../../utils/calculateCountdown";

const Arrivals: React.FC<{
  arrivals: ArrivalsGroupedType;
  lineId: string | undefined;
}> = ({ arrivals, lineId }) => {
  return Object.entries(arrivals).map(([platformName, arrivals]) => (
    <Box key={platformName}>
      <Box
        sx={{
          padding: 2,
          background: mapLineColor(lineId),
          borderTopLeftRadius: "7px",
          borderTopRightRadius: "7px",
        }}
      >
        {platformName}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          padding: 2,
          background: "black",
          color: "yellow",
        }}
      >
        <Typography variant="h6">DESTINATION</Typography>
        <Typography variant="h6">DUE</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          flexDirection: "column",
          background: "black",
          borderBottomLeftRadius: "7px",
          borderBottomRightRadius: "7px",
        }}
      >
        {arrivals.map((arrival, idx) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #242424",
              padding: 2,
            }}
            key={arrival.currentLocation + idx  }
          >
            <Box sx={{ maxWidth: "70%" }}>
              <Typography variant="h6">{arrival.towards}</Typography>
              <Typography variant="caption">
                {arrival.currentLocation}
              </Typography>
            </Box>
            <Typography variant="h6">
              {calculateCountdown(arrival.expectedArrival)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  ));
};

export default Arrivals;
