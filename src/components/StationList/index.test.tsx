import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { StationListType } from "../../types";
import StationList from "./index";
import { MemoryRouter } from "react-router-dom";

const mockStations: StationListType = [
  { id: "station1", name: "Station One", lineId: "line1" },
  { id: "station2", name: "Station Two", lineId: "line1" },
  { id: "station3", name: "Station Three", lineId: "line2" },
];

describe("StationList component", () => {
  it("renders all stations correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <StationList stations={mockStations} />
      </MemoryRouter>
    );
    expect(getByText("Station One")).toBeInTheDocument();
    expect(getByText("Station Two")).toBeInTheDocument();
    expect(getByText("Station Three")).toBeInTheDocument();
  });

  it("generates correct number of station components", () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <StationList stations={mockStations} />
      </MemoryRouter>
    );
    const stationComponents = getAllByRole("link");
    expect(stationComponents).toHaveLength(3);
  });

  it("passes correct props to each station component", () => {
    const { getByText } = render(
      <MemoryRouter>
        <StationList stations={mockStations} />
      </MemoryRouter>
    );
    expect(getByText("Station One").closest("a")).toHaveAttribute(
      "href",
      "/line/line1/station/station1"
    );
    expect(getByText("Station Two").closest("a")).toHaveAttribute(
      "href",
      "/line/line1/station/station2"
    );
    expect(getByText("Station Three").closest("a")).toHaveAttribute(
      "href",
      "/line/line2/station/station3"
    );
  });
});
