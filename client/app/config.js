/*global __PROCESS__*/
export default function () {
  const FLIGHTS_URL = 'https://api.skypicker.com/flights';
  const PLACES_URL = 'https://api.skypicker.com/places';

  return {
    flightsApiUrl: FLIGHTS_URL,
    placesApiUrl: PLACES_URL,
    isDev: __PROCESS__.ENV === 'development'
  }
}
