import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Navbar from "./index";

describe("Navbar component", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Navbar />);
    
    expect(getByTestId("logo-non-mobile")).toBeInTheDocument();
    expect(getByTestId("logo-mobile")).toBeInTheDocument();

  });
});
