import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import LinePage from "./index";
import { LineProviderType, LineResponse, StationResponse } from "../../types";
import LineContext from "../../providers/LineProvider/LineContext";
import { HashRouter as Router } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("LinePage component", () => {
  const mockContext: LineProviderType = {
    lines: [],
    operationalOnlyLines: [],
    loading: false,
    refetch: jest.fn(),
    getLineById: jest.fn(),
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading skeleton when loadingLine is true", async () => {
    const mockLoadingLineContext: LineProviderType = {
      ...mockContext,
      loading: true,
      getLineById: jest.fn(),
    };

    (axios.get as jest.Mock).mockImplementation(() => Promise);

    const { getByTestId } = render(
      <Router>
        <LinePage />
      </Router>,
      {
        wrapper: ({ children }) => (
          <LineContext.Provider value={mockLoadingLineContext}>
            {children}
          </LineContext.Provider>
        ),
      }
    );

    await waitFor(() => {
      expect(getByTestId("loading-line-skeleton")).toBeInTheDocument();
    });
  });

  it("renders line information when loadingLine is false and line data is available", async () => {
    const mockLineResponse: LineResponse[] = [
      {
        id: "victoria",
        name: "Victoria",
        lineStatuses: [
          {
            statusSeverity: 10,
            statusSeverityDescription: "Good Service",
            reason: "All lines are running smoothly",
            validityPeriods: [
              {
                fromDate: "2021-10-01T00:00:00",
                toDate: "2021-10-02T00:00:00",
              },
            ],
          },
        ],
      },
    ];

    const mockLine = {
      id: "victoria",
      name: "Victoria",
      status: "Good Service",
      statusText: "All lines are running smoothly",
      statusSeverity: 10,
      fromDate: "2021-10-01T00:00:00",
      toDate: "2021-10-02T00:00:00",
    };

    const mockLoadingLineContext: LineProviderType = {
      ...mockContext,
      loading: false,
      getLineById: jest.fn(() => mockLine),
    };

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: mockLineResponse })
    );

    const { getByText } = render(
      <Router>
        <LinePage />
      </Router>,
      {
        wrapper: ({ children }) => (
          <LineContext.Provider value={mockLoadingLineContext}>
            {children}
          </LineContext.Provider>
        ),
      }
    );

    await waitFor(() => {
      expect(getByText("Victoria")).toBeInTheDocument();
      expect(getByText("Good Service")).toBeInTheDocument();
    });
  });

  it("renders station information when station data is available", async () => {
    const mockStationData: StationResponse[] = [
      { naptanId: "station1", commonName: "Station One" },
      { naptanId: "station2", commonName: "Station Two" },
      { naptanId: "station3", commonName: "Station Three" },
    ];

    jest.mock("../../hooks/useFetch", () => ({
      data: mockStationData,
      loading: false,
      error: null,
    }));

    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({ data: mockStationData })
    );

    const mockLoadingLineContext: LineProviderType = {
      ...mockContext,
      loading: false,
      getLineById: jest.fn(), // Mock getLineById as needed
    };

    const { getByText } = render(
      <Router>
        <LinePage />
      </Router>,
      {
        wrapper: ({ children }) => (
          <LineContext.Provider value={mockLoadingLineContext}>
            {children}
          </LineContext.Provider>
        ),
      }
    );

    await waitFor(() => {
      expect(getByText("Station One")).toBeInTheDocument();
      expect(getByText("Station Two")).toBeInTheDocument();
      expect(getByText("Station Three")).toBeInTheDocument();
    });
  });

  it("renders loading skeleton when station data is loading", async () => {
    const mockLoadingLineContext: LineProviderType = {
      ...mockContext,
      loading: false,
      getLineById: jest.fn(),
    };

    (axios.get as jest.Mock).mockImplementation(() => Promise);

    jest.mock("../../hooks/useFetch", () => ({
      data: null,
      loading: true,
      error: null,
    }));

    const { getByTestId } = render(
      <Router>
        <LinePage />
      </Router>,
      {
        wrapper: ({ children }) => (
          <LineContext.Provider value={mockLoadingLineContext}>
            {children}
          </LineContext.Provider>
        ),
      }
    );

    await waitFor(() => {
      expect(getByTestId("loading-station-skeleton")).toBeInTheDocument();
    });
  });
});
