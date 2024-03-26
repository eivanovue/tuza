import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import mapLineColor from "../../utils/mapLineColor";
import { LineType } from "../../types";
import React from "react";

const Line: React.FC<LineType> = ({
  id,
  name,
  status,
  statusText,
  fromDate,
  toDate,
}) => {
  const lineColor = mapLineColor(id);

  const getLineStatusIcon = (status: string) => {
    if (status === "Severe Delays" || status === "Part Closure") {
      return <ErrorIcon sx={{ fontSize: 48 }} />;
    }

    if (status === "Reduced Service" || status === "Planned Closure" || status === "Minor Delays") {
      return <InfoIcon sx={{ fontSize: 48 }} />;
    }

    if (status === "Good Service") {
      return <CheckCircleIcon sx={{ fontSize: 48 }} />;
    }
  };

  const shouldDisplayStatusText = status !== "Good Service";

  const shouldDisplayStatusDate = fromDate && toDate;

  return (
    <Link
      data-testid="line"
      style={{ width: "100%", textDecoration: "none", color: "unset" }}
      to={`/line/${id}`}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            color: "white",
            background: lineColor,
            ...(shouldDisplayStatusDate
              ? {
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }
              : {
                  borderRadius: "7px",
                }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box id="icon">{getLineStatusIcon(status)}</Box>
            <Box id="icon">
              <Typography fontWeight={600} variant="h6">
                {name}
              </Typography>
              <Typography variant="h6">{status}</Typography>
            </Box>
          </Box>
        </Box>
        {fromDate && toDate && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              padding: 1,
              background: lineColor,
              color: "white",
              boxShadow: "inset 0 50px 0 0 rgba(0, 0, 0, 0.1)",
              ...(!shouldDisplayStatusText && {
                borderBottomLeftRadius: "7px",
                borderBottomRightRadius: "7px",
              }),
            }}
          >
            <InfoIcon fontSize="small" />
            <Typography variant="body2">
              {new Date(fromDate).toLocaleString('en-GB')} to{" "}
              {new Date(toDate).toLocaleString('en-GB')}
            </Typography>
          </Box>
        )}

        {shouldDisplayStatusText && (
          <Box
            sx={{
              background: "rgba(244, 244, 244, .9)",
              color: "#242424",
              borderBottomLeftRadius: "7px",
              borderBottomRightRadius: "7px",
            }}
          >
            <Typography variant="body2" sx={{ padding: 2 }}>
              {statusText}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default Line;
