import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HolidayCalculatorForm from './holidayCalculatorForm';
import { MAX_TRIPS } from '../constants';
import { Trip } from '../types';

jest.mock('./holidayCalculatorForm.module.scss', () => ({
  tableCellInput: 'table-cell-input',
  submitButton: 'submit-button',
  holidayCalculatorForm: 'holiday-calculator-form',
}));


describe('HolidayCalculatorForm', () => {
  const defaultProps = {
    trips: [],
    passengers: '2',
    home: 'B20',
    dest: 'D',
    name: 'Summer Trip',
    handleSubmit: jest.fn((e) => e.preventDefault()),
    handleChange: jest.fn(),
  };

  it('renders all input fields with correct values', () => {
    render(<HolidayCalculatorForm {...defaultProps} />);
    expect(screen.getByLabelText('Passengers:')).toHaveValue(2);
    expect(screen.getByLabelText('Home to airport (e.g. B20):')).toHaveValue('B20');
    expect(screen.getByLabelText('Destination (e.g. D):')).toHaveValue('D');
    expect(screen.getByLabelText('Trip Name:')).toHaveValue('Summer Trip');
  });

  it('calls handleChange when input values change', () => {
    render(<HolidayCalculatorForm {...defaultProps} />);
    fireEvent.change(screen.getByLabelText('Passengers:'), { target: { value: '3' } });
    expect(defaultProps.handleChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('Home to airport (e.g. B20):'), { target: { value: 'C10' } });
    expect(defaultProps.handleChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('Destination (e.g. D):'), { target: { value: 'E' } });
    expect(defaultProps.handleChange).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('Trip Name:'), { target: { value: 'Winter Trip' } });
    expect(defaultProps.handleChange).toHaveBeenCalled();
  });

  it('disables submit button and shows warning when max trips reached', () => {
    const trips = Array(MAX_TRIPS).fill({}) as Trip[];
    render(<HolidayCalculatorForm {...defaultProps} trips={trips} />);
    expect(screen.getByRole('button', { name: 'Save trip' })).toBeDisabled();
    expect(screen.getByText(new RegExp(`Maximum of ${MAX_TRIPS} trips reached`, 'i'))).toBeInTheDocument();
  });

  it('shows correct placeholder for trip name', () => {
    render(<HolidayCalculatorForm {...defaultProps} trips={[{}, {}] as Trip[]} />);
    expect(screen.getByPlaceholderText('Trip 3')).toBeInTheDocument();
  });
});