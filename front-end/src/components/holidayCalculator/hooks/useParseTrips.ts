import { useMemo } from "react";
import { Trip, TripDetails } from "../types";

const useParseTrips = (trips: TripDetails[]): Trip[] => {
	return useMemo(() => {
		return trips.map((trip, idx) => ({
			passengers: trip.passengers,
			homeAirport: trip.home[0],
			homeDistance: parseInt(trip.home.slice(1), 10),
			destination: trip.destination,
			name: trip.name || `Trip ${idx + 1}`
		}));
	}, [trips]);
};

export default useParseTrips;
