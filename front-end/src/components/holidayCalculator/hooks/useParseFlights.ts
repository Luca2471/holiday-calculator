import { useMemo } from "react";

type Flight = {
	origin: string;
	destination: string;
	distance: number;
	flight: string;
};

const useParseFlights = (flights: string[]): Flight[] => {
	return useMemo(() => {
		return flights.map(flight => {
			const origin = flight[0];
			const destination = flight[1];
			const distance = parseInt(flight.slice(2), 10);
			return { origin, destination, distance, flight };
		});
	}, [flights]);
}

export default useParseFlights;
