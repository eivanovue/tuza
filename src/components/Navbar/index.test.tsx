import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Navbar from "./index";
import { HashRouter } from "react-router-dom";

describe("Navbar component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );

    expect(getByTestId("logo-non-mobile")).toBeInTheDocument();
    expect(getByTestId("logo-mobile")).toBeInTheDocument();
  });
});
