import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "./index";
import { LineProviderType, LineResponse, LineListType } from "../../types";
import LineContext from "../../providers/LineProvider/LineContext";
import lineMapper from "../../utils/lineMapper";
import { HashRouter as Router } from "react-router-dom";

describe("Home component", () => {
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

  it("renders loading skeleton when loading is true", () => {
    const mockLoadingContext: LineProviderType = {
      ...mockContext,
      loading: true,
    };

    const { getByTestId } = render(<Home />, {
      wrapper: ({ children }) => (
        <LineContext.Provider value={mockLoadingContext}>
          {children}
        </LineContext.Provider>
      ),
    });

    expect(getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("renders lines when loading is false", () => {
    const mockLines: LineResponse[] = [
      {
        id: "1",
        name: "Line 1",
        lineStatuses: [
          {
            statusSeverity: 10,
            statusSeverityDescription: "Good Service",
            reason: "",
            validityPeriods: [],
          },
        ],
      },
      {
        id: "2",
        name: "Line 2",
        lineStatuses: [
          {
            statusSeverity: 15,
            statusSeverityDescription: "Minor Delays",
            reason: "",
            validityPeriods: [],
          },
        ],
      },
    ];

    const mappedMockLines: LineListType = mockLines.map(lineMapper);

    const mockContextWithData: LineProviderType = {
      ...mockContext,
      lines: mappedMockLines,
      operationalOnlyLines: mappedMockLines,
    };

    const { getByText } = render(
      <LineContext.Provider value={mockContextWithData}>
        <Router>
          <Home />
        </Router>
      </LineContext.Provider>
    );

    expect(getByText("Line 1")).toBeInTheDocument();
    expect(getByText("Line 2")).toBeInTheDocument();
  });

  it("calls refetch and updates state when 'Get Latest Data' button is clicked", async () => {
    const mockRefetch = jest.fn();
    const mockContextWithRefetch: LineProviderType = {
      ...mockContext,
      refetch: mockRefetch,
    };

    const { getByText } = render(
      <Router>
        <Home />
      </Router>,
      {
        wrapper: ({ children }) => (
          <LineContext.Provider value={mockContextWithRefetch}>
            {children}
          </LineContext.Provider>
        ),
      }
    );

    fireEvent.click(getByText("Get Latest Data"));

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("toggles switch state when 'Show all lines' switch is clicked", () => {
    const mockLines: LineResponse[] = [
      {
        id: "1",
        name: "Line 1",
        lineStatuses: [
          {
            statusSeverity: 10,
            statusSeverityDescription: "Good Service",
            reason: "",
            validityPeriods: [],
          },
        ],
      },
      {
        id: "2",
        name: "Line 2",
        lineStatuses: [
          {
            statusSeverity: 15,
            statusSeverityDescription: "Minor Delays",
            reason: "",
            validityPeriods: [],
          },
        ],
      },
    ];

    const mappedMockLines: LineListType = mockLines.map(lineMapper);

    const { getByLabelText } = render(
      <Router>
        <Home />
      </Router>,
      {
        wrapper: ({ children }) => (
          <LineContext.Provider
            value={{
              ...mockContext,
              lines: mappedMockLines,
            }}
          >
            {children}
          </LineContext.Provider>
        ),
      }
    );

    const switchInput = getByLabelText("Show all lines") as HTMLInputElement;
    expect(switchInput.checked).toBe(false);

    fireEvent.click(switchInput);
    expect(switchInput.checked).toBe(true);
  });
});
