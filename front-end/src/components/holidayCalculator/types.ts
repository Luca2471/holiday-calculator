export type FlightGraph = Map<string, Flight[]>;

export type Flight = {
	origin: string;
	destination: string;
	distance: number;
	flight: string;
};

export type RouteResult = {
	route: string;
	cost: number;
} | null;

export type Node = {
	airport: string;
	cost: number;
	path: Flight[];
};

export type CalculateBestRouteProps = {
	graph: FlightGraph,
	origin: string,
	destination: string,
	passengers: number,
};

export type TripDetails = {
	passengers: number;
	home: string;
	destination: string;
	name: string;
};

export type Trip = {
	passengers: number;
	homeAirport: string;
	homeDistance: number;
	destination: string;
	name?: string;
};

export type Suggestion = {
	vehicle: string;
	vehicleCost: string;
	outboundRoute: string;
	outboundCost: string;
	inboundRoute: string;
	inboundCost: string;
	totalCost: string;
	name: string;
};
