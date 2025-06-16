import React from 'react';
import { MAX_TRIPS } from '../constants';
import { Trip } from '../types';
import styles from './holidayCalculatorForm.module.scss';

type HolidayCalculatorFormProps = {
	trips: Trip[];
	passengers: string;
	home: string;
	dest: string;
	name: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const HolidayCalculatorForm = ({ trips, passengers, home, dest, name, handleSubmit, handleChange }: HolidayCalculatorFormProps) => {
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={styles.holidayCalculatorForm}
			>
				<label style={{ marginRight: 16,  }}>
					<span style={{ fontWeight: 500, padding: "0px 12px" }}>Passengers:</span>{" "}
					<input
						name="passengers"
						type="number"
						min={1}
						value={passengers}
						onChange={handleChange}
						required
						style={{ width: 60 }}
						className={styles.tableCellInput}
					/>
				</label>
				<label style={{ marginRight: 16 }}>
					<span style={{ fontWeight: 500 }}>Home to airport (e.g. B20):</span>{" "}
					<input
						name="home"
						type="text"
						value={home}
						onChange={handleChange}
						required
						pattern="^[A-Za-z][0-9]+$"
						style={{ width: 80 }}
						className={styles.tableCellInput}
					/>
				</label>
				<label style={{ marginRight: 16 }}>
					<span style={{ fontWeight: 500 }}>Destination (e.g. D):</span>{" "}
					<input
						name="dest"
						type="text"
						value={dest}
						onChange={handleChange}
						required
						pattern="^[A-Za-z]$"
						style={{ width: 40 }}
						className={styles.tableCellInput}
					/>
				</label>
				<label style={{ marginRight: 16 }}>
					<span style={{ fontWeight: 500 }}>Trip Name:</span>{" "}
					<input
						name="name"
						type="text"
						value={name}
						onChange={handleChange}
						maxLength={40}
						placeholder={`Trip ${trips.length + 1}`}
						style={{ width: 120 }}
						className={styles.tableCellInput}
					/>
				</label>
				<button
					type="submit"
					className={styles.submitButton}
					disabled={trips.length >= MAX_TRIPS}
				>
					Save trip
				</button>
				{trips.length >= MAX_TRIPS && (
					<span style={{ color: "#e53935", marginLeft: 16, fontWeight: 500 }}>
						Maximum of {MAX_TRIPS} trips reached.
					</span>
				)}
			</form>
		</>
	)
};

export default HolidayCalculatorForm;
