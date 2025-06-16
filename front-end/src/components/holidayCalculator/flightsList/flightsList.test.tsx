import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FlightsList from "./flightsList";
import { Suggestion, Trip } from "../types";
import { tableHeaders } from "../constants";

jest.mock('./flightsList.module.scss', () => ({
  holidayCalculatorTable: 'holiday-calculator-table',
  deleteButton: 'delete-button',
  tableHeader: 'table-header',
}));

const suggestions: Suggestion[] = [
  {
    vehicle: "Car",
    vehicleCost: "100",
    outboundRoute: "A-B",
    outboundCost: "50",
    inboundRoute: "B-A",
    inboundCost: "60",
    totalCost: "210",
    name: "Trip 1",
  },
  {

    vehicle: "Plane",
    vehicleCost: "200",
    outboundRoute: "C-D",
    outboundCost: "150",
    inboundRoute: "D-C",
    inboundCost: "160",
    totalCost: "510",
    name: "Trip 2",
  }
];

describe("FlightsList", () => {
  it("renders table headers", () => {
    render(
      <FlightsList
        tableHeaders={tableHeaders}
        suggestions={suggestions}
        onClickEvent={jest.fn()}
      />
    );
    tableHeaders.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it("renders all suggestions", () => {
    render(
      <FlightsList
        tableHeaders={tableHeaders}
        suggestions={suggestions}
        onClickEvent={jest.fn()}
      />
    );
    suggestions.forEach(suggestion => {
      expect(screen.getByText(suggestion.name)).toBeInTheDocument();
      expect(screen.getByText(suggestion.vehicle)).toBeInTheDocument();
      expect(screen.getByText(`£${suggestion.vehicleCost}`)).toBeInTheDocument();
      expect(screen.getByText(suggestion.outboundRoute)).toBeInTheDocument();
      expect(screen.getByText(`£${suggestion.outboundCost}`)).toBeInTheDocument();
      expect(screen.getByText(suggestion.inboundRoute)).toBeInTheDocument();
      expect(screen.getByText(`£${suggestion.inboundCost}`)).toBeInTheDocument();
      expect(screen.getByText(`£${suggestion.totalCost}`)).toBeInTheDocument();
    });
  });

  it("applies alternating row backgrounds", () => {
    render(
      <FlightsList
        tableHeaders={tableHeaders}
        suggestions={suggestions}
        onClickEvent={jest.fn()}
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveStyle("background: #fafbfc");
    expect(rows[2]).toHaveStyle("background: #fff");
  });

  it("renders nothing if suggestions is empty", () => {
    render(
      <FlightsList
        tableHeaders={tableHeaders}
        suggestions={[]}
        onClickEvent={jest.fn()}
      />
    );
    expect(screen.queryByText(suggestions[0]?.name)).not.toBeInTheDocument();
    expect(screen.queryByText(suggestions[1]?.name)).not.toBeInTheDocument();
  });
});