import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import Line from "./index";
import { LineType } from "../../types";

describe("Line component", () => {
  describe("Good service", () => {
    const line: LineType = {
      id: "victoria",
      name: "Victoria",
      status: "Good Service",
      statusText: "All lines are running smoothly",
      statusSeverity: 10,
      fromDate: "2021-10-01T00:00:00",
      toDate: "2021-10-02T00:00:00",
    };

    let component: RenderResult;

    beforeEach(() => {
      component = render(
        <Router>
          <Line {...line} />
        </Router>
      );
    });

    it("renders all elements correctly", () => {
      const { getByText, getByTestId } = component;

      const nameElement = getByText(line.name);
      const statusElement = getByText(line.status);
      const statusIconElement = getByTestId("CheckCircleIcon");
      const infoIconElement = getByTestId("InfoIcon");

      expect(nameElement).toBeInTheDocument();
      expect(statusElement).toBeInTheDocument();
      expect(statusIconElement).toBeInTheDocument();
      expect(infoIconElement).toBeInTheDocument();
    });

    it("does not render status text", () => {
      const { queryByText } = component;

      const statusText = queryByText(line.statusText);

      expect(statusText).not.toBeInTheDocument();
    });
  });

  describe("Reduced Service", () => {
    const line: LineType = {
      id: "circle",
      name: "Circle",
      status: "Reduced Service",
      statusText:
        "Reduced Service clockwise due to an earlier faulty train at Baker Street",
      statusSeverity: 10,
      fromDate: "2021-10-01T00:00:00",
      toDate: "2021-10-02T00:00:00",
    };

    let component: RenderResult;

    beforeEach(() => {
      component = render(
        <Router>
          <Line {...line} />
        </Router>
      );
    });

    it("renders all elements correctly", () => {
      const { getByText, queryAllByTestId } = component;

      const nameElement = getByText(line.name);
      const statusElement = getByText(line.status);
      const statusText = getByText(line.statusText);
      const infoIconElements = queryAllByTestId("InfoIcon");

      expect(nameElement).toBeInTheDocument();
      expect(statusElement).toBeInTheDocument();
      expect(statusText).toBeInTheDocument();
      expect(infoIconElements).toHaveLength(2);
    });
  });

  describe("Severe Delays", () => {
    const line: LineType = {
      id: "central",
      name: "Central",
      status: "Severe Delays",
      statusText: "Severe delays between White City and Ealing Broadway",
      statusSeverity: 10,
      fromDate: "2021-10-01T00:00:00",
      toDate: "2021-10-02T00:00:00",
    };

    let component: RenderResult;

    beforeEach(() => {
      component = render(
        <Router>
          <Line {...line} />
        </Router>
      );
    });

    it("renders all elements correctly", () => {
      const { getByText, getByTestId } = component;

      const nameElement = getByText(line.name);
      const statusElement = getByText(line.status);
      const statusText = getByText(line.statusText);
      const statusIconElement = getByTestId("ErrorIcon");
      const infoIconElement = getByTestId("InfoIcon");

      expect(nameElement).toBeInTheDocument();
      expect(statusElement).toBeInTheDocument();
      expect(statusText).toBeInTheDocument();
      expect(statusIconElement).toBeInTheDocument();
      expect(infoIconElement).toBeInTheDocument();
    });
  });
});
