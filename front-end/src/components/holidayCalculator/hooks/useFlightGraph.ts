import { FlightGraph } from "../types";
import useParseFlights from "./useParseFlights";

const useFlightGraph = (flights: string[]): FlightGraph => {
	const parseFlights = useParseFlights(flights);

	const graph: FlightGraph = new Map();
	for (const flight of parseFlights) {
		if (!graph.has(flight.origin)) graph.set(flight.origin, []);
		graph.get(flight.origin)!.push(flight);
	}
	return graph;
}

export default useFlightGraph;
