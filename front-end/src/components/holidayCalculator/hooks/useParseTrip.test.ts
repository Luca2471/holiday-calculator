import { renderHook } from '@testing-library/react';
import useParseTrips from './useParseTrips';
describe('useParseTrip', () => {
  it('should return parsed trip data', () => {
    const tripData = [{ destination: "C", home: "A30", name: "test trip 1", passengers: 2 }, { destination: "D", home: "Z20", name: "test trip 2", passengers: 1 },];

    const { result } = renderHook(() => useParseTrips(tripData));

    expect(result.current).toEqual([
      {
        "destination": "C", "homeAirport": "A", "homeDistance": 30, "name": "test trip 1", "passengers": 2
      },
      {
        "destination": "D", "homeAirport": "Z", "homeDistance": 20, "name": "test trip 2", "passengers": 1
      }
    ]);
  });
});