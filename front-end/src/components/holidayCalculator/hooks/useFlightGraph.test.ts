import { renderHook } from "@testing-library/react";
import useFlightGraph from "./useFlightGraph";
import * as useParseFlightsModule from "./useParseFlights";
import { Flight } from "../types";

describe("useFlightGraph", () => {
  const mockFlights: Flight[] = [
    { origin: "A", destination: "B", distance: 12, flight: "AB12" },
    { origin: "A", destination: "C", distance: 200, flight: "AC200" },
    { origin: "B", destination: "C", distance: 329, flight: "BC329" },
  ];

  beforeEach(() => {
    jest.spyOn(useParseFlightsModule, "default").mockImplementation(() => mockFlights);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a graph with correct keys and values", () => {
    const { result } = renderHook(() => useFlightGraph(["flight1", "flight2"]));
    expect(result.current.size).toBe(2);
    expect(result.current.get("A")).toEqual([
      { origin: "A", destination: "B", distance: 12, flight: "AB12" },
      { origin: "A", destination: "C", distance: 200, flight: "AC200" },
    ]);
    expect(result.current.get("B")).toEqual([
      { origin: "B", destination: "C", distance: 329, flight: "BC329" },
    ]);
  });

  it("should return an empty graph if no flights are parsed", () => {
    (useParseFlightsModule.default as jest.Mock).mockImplementation(() => []);
    const { result } = renderHook(() => useFlightGraph([]));
    expect(result.current.size).toBe(0);
  });

  it("should group flights by origin", () => {
    const flights: Flight[] = [
      { origin: "X", destination: "Y", distance: 50, flight: "XY50" },
      { origin: "X", destination: "Z", distance: 60, flight: "XZ60" },
      { origin: "Y", destination: "Z", distance: 70, flight: "YZ70" },
    ];
    (useParseFlightsModule.default as jest.Mock).mockImplementation(() => flights);
    const { result } = renderHook(() => useFlightGraph(["f1", "f2", "f3"]));
    expect(result.current.get("X")).toHaveLength(2);
    expect(result.current.get("Y")).toHaveLength(1);
    expect(result.current.get("Z")).toBeUndefined();
  });
});