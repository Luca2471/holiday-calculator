"use client";

import React, { useState } from 'react';
import styles from './holidayCalculatorContainer.module.scss';
import { useFlightGraph, useParseTrips } from './hooks';
import FlightsList from './flightsList/flightsList';
import { FLIGHTS_RAW, RAW_TRIPS, MAX_TRIPS, tableHeaders } from './constants';
import { getTripSuggestion } from './helpers';
import HolidayCalculatorForm from './holidayCalculatorForm/holidayCalculatorForm';


const HolidayCalculatorContainer = () => {
	const graph = useFlightGraph(FLIGHTS_RAW);
	const Trips = useParseTrips(RAW_TRIPS);

	const [trips, setTrips] = useState(Trips);
	const [form, setForm] = useState({ passengers: "", home: "", dest: "", name: "" });
	const { passengers, home, dest, name } = form;

	const suggestions = trips.map((trip, idx) => getTripSuggestion(trip, graph, idx));

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target;
		setForm(form => ({ ...form, [name]: value }));
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (trips.length >= MAX_TRIPS) {
			alert(`You can only add up to ${MAX_TRIPS} trips.`);
			return;
		};
		if (
			!passengers ||
			!home ||
			home.length < 2 ||
			!dest
		) {
			alert("Please enter valid input.");
			return;
		};
		setTrips(trips => [
			...trips,
			{
				passengers: Number(passengers),
				homeAirport: home[0].toUpperCase(),
				homeDistance: Number(home.slice(1)),
				destination: dest[0].toUpperCase(),
				name: name && name.trim() ? name : `Trip ${trips.length + 1}`
			}
		]);
		setForm({ passengers: "", home: "", dest: "", name: "" });
	};

	return (
		<div className={styles.holidayCalculatorContainer} >
			<HolidayCalculatorForm 
				passengers={passengers}
				home={home}
				dest={dest}
				name={name}
				trips={trips}
				handleSubmit={handleSubmit} 
				handleChange={handleChange}
			/>
			<FlightsList
				tableHeaders={tableHeaders}
				suggestions={suggestions}
				onClickEvent={(callback) => setTrips(callback(trips))}
			/>
		</div>
	);
};

export default HolidayCalculatorContainer;
