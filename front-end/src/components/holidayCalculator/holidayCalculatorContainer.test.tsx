import React from 'react';
import HolidayCalculatorContainer from './holidayCalculatorContainer';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('./holidayCalculatorContainer.module.scss', () => ({
	holidayCalculator: 'holidayCalculator',
}));

jest.mock('./holidayCalculatorContainer.module.scss', () => ({
	holidayCalculatorContainer: 'holidayCalculatorContainer',
}));

jest.mock('./flightsList/flightsList', () => (props: any) => (
	<div data-testid="flights-list">{JSON.stringify(props)}</div>
));

jest.mock('./hooks', () => ({
	useFlightGraph: () => ({}),
	useParseTrips: () => ([]),
}));

jest.mock('./constants', () => ({
	FLIGHTS_RAW: [],
	RAW_TRIPS: [],
	MAX_TRIPS: 2,
	tableHeaders: ['Header1', 'Header2'],
}));

jest.mock('./helpers', () => ({
	getTripSuggestion: jest.fn(() => ({})),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

jest.mock('./holidayCalculatorForm/holidayCalculatorForm', () => (props: any) => (
	<form data-testid="holiday-form" onSubmit={props.handleSubmit}>
		<input
			name="passengers"
			value={props.passengers}
			onChange={props.handleChange}
			placeholder="Passengers"
		/>
		<input
			name="home"
			value={props.home}
			onChange={props.handleChange}
			placeholder="Home"
		/>
		<input
			name="dest"
			value={props.dest}
			onChange={props.handleChange}
			placeholder="Destination"
		/>
		<input
			name="name"
			value={props.name}
			onChange={props.handleChange}
			placeholder="Name"
		/>
		<button type="submit">Add Trip</button>
	</form>
));

const renderHolidayCalculatorContainer = () => {
	return render(<HolidayCalculatorContainer />);
};

describe('HolidayCalculatorContainer', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the form and flights list', () => {
		renderHolidayCalculatorContainer();
		expect(screen.getByTestId('holiday-form')).toBeInTheDocument();
		expect(screen.getByTestId('flights-list')).toBeInTheDocument();
	});

	it('updates form state on input change', () => {
		renderHolidayCalculatorContainer();
		const passengersInput = screen.getByPlaceholderText('Passengers') as HTMLInputElement;
		fireEvent.change(passengersInput, { target: { value: '3', name: 'passengers' } });
		expect(passengersInput.value).toBe('3');
	});

	it('shows alert if form is invalid', () => {
		renderHolidayCalculatorContainer();		
		window.alert = jest.fn();
		const form = screen.getByTestId('holiday-form');
		fireEvent.submit(form);
		expect(window.alert).toHaveBeenCalledWith('Please enter valid input.');
	});

	it('adds a trip and resets the form', () => {
		renderHolidayCalculatorContainer();
		const passengersInput = screen.getByPlaceholderText('Passengers');
		const homeInput = screen.getByPlaceholderText('Home');
		const destInput = screen.getByPlaceholderText('Destination');
		const nameInput = screen.getByPlaceholderText('Name');
		fireEvent.change(passengersInput, { target: { value: '2', name: 'passengers' } });
		fireEvent.change(homeInput, { target: { value: 'A100', name: 'home' } });
		fireEvent.change(destInput, { target: { value: 'B', name: 'dest' } });
		fireEvent.change(nameInput, { target: { value: 'My Trip', name: 'name' } });
		const form = screen.getByTestId('holiday-form');
		fireEvent.submit(form);
		expect((passengersInput as HTMLInputElement).value).toBe('');
		expect((homeInput as HTMLInputElement).value).toBe('');
		expect((destInput as HTMLInputElement).value).toBe('');
		expect((nameInput as HTMLInputElement).value).toBe('');
	});
});
