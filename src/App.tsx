import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import LinePage from "./pages/Line";
import StationPage from "./pages/Station";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path="/line/:id" element={<LinePage />} />
        <Route path="/line/:lineId/station/:stationId" element={<StationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default App;
