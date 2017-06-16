/*global __PROCESS__*/
export default function () {
  const BACKEND_URL = 'https://api.skypicker.com/';
  const API_URL = `${BACKEND_URL}/flights`;

  return {
    backendUrl: BACKEND_URL,
    apiUrl: API_URL,
    isDev: __PROCESS__.ENV === 'development'
  }
}
