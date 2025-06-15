import { renderHook } from "@testing-library/react";
import useParseFlights from './useParseFlights';

const flights: string[] = [
	"CE200", "DC700", "EB500", "ZE200"
];

describe('useParseFlight', () => {
  it('should parse a flight', () => {
    const { result } = renderHook(() => useParseFlights(flights));
    expect(result.current).toEqual([
      {
        "destination": "E", "distance": 200, "flight": "CE200", "origin": "C"
      },
      {
        "destination": "C", "distance": 700, "flight": "DC700", "origin": "D"
      },
      {
        "destination": "B", "distance": 500, "flight": "EB500", "origin": "E"
      },
      {
        "destination": "E", "distance": 200, "flight": "ZE200", "origin": "Z"
      }
    ]);
  });
});