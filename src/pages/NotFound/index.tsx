import React from "react";
import { Box, Button, Typography } from "@mui/material";
import NotFoundImage from "../../assets/not_found.png";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 2,
        padding: 2,
      }}
    >
      <img
        src={NotFoundImage}
        alt="Not Found"
        style={{ width: "100%", objectFit: "contain", maxWidth: "500px" }}
      />
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="h4" align="center">
        Something's wrong here.
      </Typography>
      <Typography variant="body1" align="center">
        This is a 404 error, which means you've clicked on a bad link or entered
        an invalid URL. Maybe what you are looking for can be found via the
        pressing the button below.
      </Typography>
      <Link style={{ color: "unset", textDecoration: "none" }} to="/">
        <Button variant="contained" color="inherit">
          Go home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
