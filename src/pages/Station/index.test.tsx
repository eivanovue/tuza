import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import StationPage from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import { ArrivalListType } from "../../types";
import axios from "axios";

jest.mock("axios");

describe("StationPage component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders arrivals when data is available", async () => {
    const mockArrivalsData: ArrivalListType = [
      {
        stationName: "Station A",
        platformName: "Platform 1",
        direction: "North",
        currentLocation: "Location A",
        towards: "Destination A",
        expectedArrival: "2022-01-01T12:00:00Z",
      },
    ];

    jest.mock("../../hooks/useFetch", () => ({
      data: mockArrivalsData,
      loading: false,
      error: null,
    }));

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: mockArrivalsData })
    );

    const { getByText } = render(
      <Router>
        <StationPage />
      </Router>
    );

    await waitFor(() => {
      expect(getByText("Platform 1")).toBeInTheDocument();
      expect(getByText("Location A")).toBeInTheDocument();
      expect(getByText("Destination A")).toBeInTheDocument();
    });
  });

  it("renders arrivals when data is available and has two platforms", async () => {
    const mockArrivalsData: ArrivalListType = [
      {
        stationName: "Station A",
        platformName: "Platform 1",
        direction: "North",
        currentLocation: "Location A",
        towards: "Destination A",
        expectedArrival: "2022-01-01T12:00:00Z",
      },
      {
        stationName: "Station B",
        platformName: "Platform 2",
        direction: "South",
        currentLocation: "Location B",
        towards: "Destination B",
        expectedArrival: "2022-01-01T12:00:00Z",
      },
    ];

    jest.mock("../../hooks/useFetch", () => ({
      data: mockArrivalsData,
      loading: false,
      error: null,
    }));

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: mockArrivalsData })
    );

    const { getByText } = render(
      <Router>
        <StationPage />
      </Router>
    );

    await waitFor(() => {
      expect(getByText("Platform 1")).toBeInTheDocument();
      expect(getByText("Location A")).toBeInTheDocument();
      expect(getByText("Destination A")).toBeInTheDocument();
      expect(getByText("Platform 2")).toBeInTheDocument();
      expect(getByText("Location B")).toBeInTheDocument();
      expect(getByText("Destination B")).toBeInTheDocument();
    });
  });
});
