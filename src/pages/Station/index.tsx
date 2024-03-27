import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {
  ArrivalListType,
  ArrivalsGroupedType,
  UseFetchType,
} from "../../types";
import { useMemo } from "react";
import arrivalMapper from "../../utils/arrivalMapper";
import groupDataByProperty from "../../utils/groupDataByProperty";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import sortArrivals from "../../utils/sortArrivals";
import Arrivals from "../../components/Arrivals";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { InfoOutlined } from "@mui/icons-material";

const StationPage: React.FC = () => {
  const { lineId, stationId } = useParams<{
    lineId: string;
    stationId: string;
  }>();

  const navigate = useNavigate();

  const {
    data: arrivalsData,
    loading: isLoadingArrivalsData,
    error: arrivalsError,
  }: UseFetchType<[] | null> = useFetch(
    `https://api.tfl.gov.uk/line/${lineId}/arrivals/${stationId}?mode=tube`
  );

  if (arrivalsError) {
    navigate("/whoops");
  }

  const arrivals: ArrivalsGroupedType = useMemo(() => {
    if (!isLoadingArrivalsData) {
      const mappedArrivals = (arrivalsData as ArrivalListType).map(
        arrivalMapper
      );

      const sortedArrivals = sortArrivals(mappedArrivals);

      const groupedArrivals = groupDataByProperty(
        sortedArrivals,
        "platformName"
      );
      return groupedArrivals;
    }
  }, [arrivalsData, isLoadingArrivalsData]);

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 4 }}>
      <Link
        style={{ color: "unset", textDecoration: "none" }}
        to={`/line/${lineId}`}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            paddingBottom: 2,
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
      {!isLoadingArrivalsData && (
        <>
          {Object.keys(arrivals).length === 0 ? (
            <Box
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: "justify",
              }}
            >
              <Box sx={{
                display: "flex",
                gap: 2,
                alignItems: "center"
              }}>
                <InfoOutlined color="warning" fontSize="large" />
                <Typography variant="h4">Station closed</Typography>
              </Box>
              <Typography variant="body2">
                There are no trains stopping at this station until further
                notice. We apologize for any inconvenience this may cause.
                Please consider alternative transportation arrangements for your
                journey.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Arrivals arrivals={arrivals} lineId={lineId} />
            </Box>
          )}
        </>
      )}
      {isLoadingArrivalsData && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rounded" width="100%" height={300} />
          <Skeleton variant="rounded" width="100%" height={300} />
        </Box>
      )}
    </Box>
  );
};

export default StationPage;
