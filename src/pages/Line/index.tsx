import {
  Box,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import Line from "../../components/Line";
import { useContext, useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import StationList from "../../components/StationList";
import stationMapper from "../../utils/stationMapper";
import sortStations from "../../utils/sortStations";
import LineContext from "../../providers/LineProvider/LineContext";
import {
  LineProviderType,
  LineType,
  StationListType,
  UseFetchType,
} from "../../types";
import mapLineColor from "../../utils/mapLineColor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LinePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { loading: loadingLine, getLineById } = useContext(
    LineContext
  ) as LineProviderType;

  const line: LineType | undefined = getLineById(id);

  const {
    data: stationData,
    loading: isLoadingStationData,
    error: stationError,
  }: UseFetchType<[] | null> = useFetch(
    `https://api.tfl.gov.uk/line/${id}/StopPoints`
  );

  if (stationError) {
    console.log('This is being called!', stationError)
    navigate("/whoops");
  }
  
  const stations: StationListType = useMemo(() => {
    if (!isLoadingStationData && stationData) {
      const mappedStations = stationData.map((station) =>
        stationMapper(station, id ?? "")
      );

      const sortedStations = sortStations(mappedStations);

      return sortedStations;
    }

    return [];
  }, [stationData, isLoadingStationData, id]);

  return (
    <Box
      sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Link
        style={{ color: "unset", textDecoration: "none" }}
        to={`/`}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            startIcon={<ArrowBackIcon />}
            sx={{ borderRadius: "7px" }}
          />
        </Box>
      </Link>
      <Box>
        {line && <Line {...line} />}
        {loadingLine && (
          <Skeleton data-testid="loading-line-skeleton" variant="rounded" width={"100%"} height={140} />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            background: mapLineColor(id),
            padding: 2,
            borderRadius: "7px",
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            Live Departures
          </Typography>
        </Box>
        {!isLoadingStationData && <StationList stations={stations} />}
        { isLoadingStationData && (
          <Box data-testid="loading-station-skeleton" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center'}}>
            {Array(20).fill(null).map((_, index) => (
              <Box sx={{ width: '45%' }} key={index}>
                <Skeleton variant="rounded" width={'100%'} height={30} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LinePage;
