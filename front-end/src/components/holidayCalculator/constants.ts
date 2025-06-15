import { TripDetails } from "./types";

export const MAX_TRIPS = 10;

export const FLIGHTS_RAW: string[] = [
	"AB800", "BC900", "CD400", "DE400",
	"BF400", "CE300", "DE300", "EB600",
	"CE200", "DC700", "EB500", "FD200"
];

export const RAW_TRIPS: TripDetails[] = [
	{ passengers: 2, home: "B20", destination: "D", name: "Trip 1" },
	{ passengers: 1, home: "B30", destination: "D", name: "Trip 2" },
	{ passengers: 2, home: "A20", destination: "D", name: "Trip 3" },
	{ passengers: 2, home: "C30", destination: "A", name: "Trip 4" },
	{ passengers: 2, home: "B10", destination: "C", name: "Trip 5" },
	{ passengers: 5, home: "B10", destination: "C", name: "Trip 6" },
	{ passengers: 1, home: "D25", destination: "B", name: "Trip 7" },
	{ passengers: 4, home: "D40", destination: "A", name: "Trip 8" },
	{ passengers: 2, home: "B5", destination: "D", name: "Trip 9" },
	{ passengers: 9, home: "B30", destination: "D", name: "Trip 10" },
];

export const tableHeaders = [
	"Trip Name",
	"Vehicle",
	"Vehicle Return Cost",
	"Outbound Route",
	"Outbound Cost",
	"Inbound Route",
	"Inbound Cost",
	"Total Cost",
	"Delete",
];
