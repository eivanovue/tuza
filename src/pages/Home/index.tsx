import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Skeleton,
  Switch,
  Typography,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import LineContext from "../../providers/LineProvider/LineContext";
import LineList from "../../components/LineList";
import { LineProviderType } from "../../types";

const Home: React.FC = () => {
  const { lines, operationalOnlyLines, loading, refetch } = useContext(
    LineContext
  ) as LineProviderType;

  const [shouldShowUnoperationalLines, setShouldShowUnoperationalLines] =
    useState<boolean>(false);

  const handleChangeShowOperational = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShouldShowUnoperationalLines(event.target.checked);
  };

  const handleGetLatestData = () => {
    refetch();
    setShouldShowUnoperationalLines(false);
  };

  if (!loading) {
    return (
      <>
        <Box
          sx={{
            paddingTop: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {lines.length > operationalOnlyLines.length ? (
            <FormControlLabel
              control={
                <Switch
                  checked={shouldShowUnoperationalLines}
                  onChange={handleChangeShowOperational}
                  color="success"
                />
              }
              label="Show all lines"
            />
          ) : (
            <Typography>Showing all lines</Typography>
          )}

          <Button
            color="success"
            variant="contained"
            startIcon={<CachedIcon />}
            onClick={handleGetLatestData}
          >
            Get Latest Data
          </Button>
        </Box>
        <LineList
          lines={shouldShowUnoperationalLines ? lines : operationalOnlyLines}
        />
      </>
    );
  }

  return (
    <Box
      data-testid="loading-skeleton"
      sx={{ paddingTop: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={"100%"}
          height={index < 1 ? 40 : 120}
        />
      ))}
    </Box>
  );
};

export default Home;
