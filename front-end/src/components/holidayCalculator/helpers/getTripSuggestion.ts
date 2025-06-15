import { Flight, FlightGraph, RouteResult, Suggestion, Trip } from "../types";

const getTripSuggestion = (
	trip: Trip,
	graph: FlightGraph,
	idx: number
): Suggestion => {
	const getVehicleSuggestion = (passengers: number, distance: number) => {
		const taxiCount = Math.ceil(passengers / 4);
		const taxiCost = taxiCount * distance * 0.4 * 2;
		const carCount = Math.ceil(passengers / 4);
		const carCost = carCount * distance * 0.2 * 2 + 3;

		if (carCost <= taxiCost) {
			return { vehicle: "Car", cost: carCost };
		} else {
			return { vehicle: "Taxi", cost: taxiCost };
		};
	};

	const calculateCheapestRoute = (
		graph: FlightGraph,
		origin: string,
		destination: string,
		passengers: number
	): RouteResult => {
		type Node = {
			airport: string;
			cost: number;
			path: Flight[];
		};
		const visited = new Set<string>();
		const queue: Node[] = [{ airport: origin, cost: 0, path: [] }];
		let best: Node | null = null;

		while (queue.length) {
			queue.sort((a, b) => a.cost - b.cost);
			const node = queue.shift()!;
			if (node.airport === destination) {
				if (!best || node.cost < best.cost) best = node;
				continue;
			}
			if (visited.has(node.airport)) continue;
			visited.add(node.airport);

			const nextFlights = graph.get(node.airport) || [];
			for (const flight of nextFlights) {
				if (node.path.find(p => p.origin === flight.origin && p.destination === flight.destination)) continue;
				queue.push({
					airport: flight.destination,
					cost: node.cost + flight.distance * passengers * 0.1,
					path: [...node.path, flight]
				});
			};
		};
		if (!best) return null;
		return {
			route: best.path.map(flight => flight.flight).join("--"),
			cost: best.cost
		};
	};

	const { vehicle, cost: vehicleCostNum } = getVehicleSuggestion(trip.passengers, trip.homeDistance);

	const outbound = calculateCheapestRoute(graph, trip.homeAirport, trip.destination, trip.passengers);

	const inbound = calculateCheapestRoute(graph, trip.destination, trip.homeAirport, trip.passengers);

	let total = 0;
	if (outbound && inbound) {
		total = vehicleCostNum + outbound.cost + inbound.cost;
	};

	return {
		vehicle,
		vehicleCost: vehicleCostNum.toFixed(2),
		outboundRoute: outbound ? outbound.route : "No outbound flight",
		outboundCost: outbound ? outbound.cost.toFixed(2) : "0",
		inboundRoute: inbound ? inbound.route : "No inbound flight",
		inboundCost: inbound ? inbound.cost.toFixed(2) : "0",
		totalCost: outbound && inbound ? total.toFixed(2) : "0",
		name: trip.name || `Trip ${idx + 1}`
	};
};

export default getTripSuggestion;