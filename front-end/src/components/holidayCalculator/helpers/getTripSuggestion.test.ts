import getTripSuggestion from "./getTripSuggestion";
import { Flight, FlightGraph, Trip } from "../types";

describe("getTripSuggestion", () => {
  const flights: Flight[] = [
    { origin: "A", destination: "B", distance: 100, flight: "TEST1",},
    { origin: "B", destination: "C", distance: 200, flight: "TEST2",},
    { origin: "C", destination: "A", distance: 300, flight: "TEST3" },
    { origin: "A", destination: "C", distance: 400, flight: "TEST4"},
    { origin: "C", destination: "B", distance: 150, flight: "TEST5",},
  ];

  const graph: FlightGraph = new Map([
    ["A", [flights[0], flights[3]]],
    ["B", [flights[1]]],
    ["C", [flights[2], flights[4]]],
  ]);

  it("suggests car when car is cheaper than taxi", () => {
    const trip: Trip = {
      name: "Test Trip",
      passengers: 2,
      homeDistance: 10,
      homeAirport: "A",
      destination: "C",
    };
    const suggestion = getTripSuggestion(trip, graph, 0);
    expect(suggestion.vehicle).toBe("Car");
    expect(Number(suggestion.vehicleCost)).toBeCloseTo(7);
  });

  it("suggests taxi when taxi is cheaper than car", () => {
    const trip: Trip = {
      name: "Taxi Trip",
      passengers: 2,
      homeDistance: 5,
      homeAirport: "B",
      destination: "D",
    };
    const suggestion = getTripSuggestion(trip, graph, 1);
    expect(suggestion.vehicle).toBe("Taxi");
  });

  it("returns 'No outbound flight' and zero costs if no outbound route", () => {
    const trip: Trip = {
      name: "No Outbound",
      passengers: 1,
      homeDistance: 5,
      homeAirport: "Z",
      destination: "C",
    };
    const suggestion = getTripSuggestion(trip, graph, 3);
    expect(suggestion.outboundRoute).toBe("No outbound flight");
    expect(suggestion.outboundCost).toBe("0");
    expect(suggestion.totalCost).toBe("0");
  });

  it("returns 'No inbound flight' and zero costs if no inbound route", () => {
    const trip: Trip = {
      name: "No Inbound",
      passengers: 1,
      homeDistance: 5,
      homeAirport: "A",
      destination: "Z",
    };
    const suggestion = getTripSuggestion(trip, graph, 4);
    expect(suggestion.inboundRoute).toBe("No inbound flight");
    expect(suggestion.inboundCost).toBe("0");
    expect(suggestion.totalCost).toBe("0");
  });

  it("uses default trip name if name is missing", () => {
    const trip: Trip = {
      passengers: 1,
      homeDistance: 5,
      homeAirport: "A",
      destination: "C",
    };
    const suggestion = getTripSuggestion(trip, graph, 5);
    expect(suggestion.name).toBe("Trip 6");
  });

  it("handles multiple passengers and calculates correct vehicle count", () => {
    const trip: Trip = {
      name: "Multi Passenger",
      passengers: 7,
      homeDistance: 10,
      homeAirport: "A",
      destination: "C",
    };
    const suggestion = getTripSuggestion(trip, graph, 6);
    expect(suggestion.vehicle).toBe("Car");
    expect(Number(suggestion.vehicleCost)).toBeCloseTo(11); 
  });
});