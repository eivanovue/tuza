import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import NotFound from "./index";
import { HashRouter as Router } from "react-router-dom";

describe("NotFound component", () => {
  it("renders the 404 image", () => {
    const { getByAltText } = render(
      <Router>
        <NotFound />
      </Router>
    );
    const notFoundImage = getByAltText("Not Found");
    expect(notFoundImage).toBeInTheDocument();
  });

  it("renders the 404 text", () => {
    const { getByText } = render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(getByText("404")).toBeInTheDocument();
    expect(getByText("Something's wrong here.")).toBeInTheDocument();
    expect(
      getByText(
        "This is a 404 error, which means you've clicked on a bad link or entered an invalid URL. Maybe what you are looking for can be found via the pressing the button below."
      )
    ).toBeInTheDocument();
  });

  it("renders a button to go home", () => {
    const { getByText } = render(
      <Router>
        <NotFound />
      </Router>
    );
    const goHomeButton = getByText("Go home");
    expect(goHomeButton).toBeInTheDocument();
    expect(goHomeButton.closest("a")).toHaveAttribute("href", "#/");
  });
});
