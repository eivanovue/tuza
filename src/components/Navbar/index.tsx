import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SubwayIcon from "@mui/icons-material/Subway";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        borderBottomLeftRadius: "7px",
        borderBottomRightRadius: "7px",
        bgcolor: "gray.900",
      }}
      color="error"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SubwayIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            data-testid="logo-non-mobile"
          >
            TUBIFY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            
          </Box>
          <SubwayIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            data-testid="logo-mobile"
          >
            TUBIFY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
