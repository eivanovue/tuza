import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Station from "./index";

const mockStation = {
  id: "station1",
  name: "Station One",
  lineId: "line1",
};

describe("Station component", () => {
  it("renders station name correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Station {...mockStation} />
      </MemoryRouter>
    );
    expect(getByText("Station One")).toBeInTheDocument();
  });

  it("renders station link correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Station {...mockStation} />
      </MemoryRouter>
    );
    const stationLink = getByText("Station One").closest("a");
    expect(stationLink).toHaveAttribute("href", "/line/line1/station/station1");
  });

  it("has unset color for link", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Station {...mockStation} />
      </MemoryRouter>
    );
    const stationLink = getByText("Station One").closest("a");
    expect(stationLink).toHaveStyle("color: unset");
  });
});
