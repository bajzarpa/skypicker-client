import toastr from 'toastr';

export default angular
  .module('app.flight-search', [])
  .service('flightSearch', function ($http, config, $rootScope) {
    let flights = [];
    let requestPending = false;

    let _onSearchSuccess = data => {
      flights = data;
      requestPending = false;

      $rootScope.$broadcast('flightsearch:results-available');
    };

    let _onSearchError = () =>
      toastr.error('There were an error while communicating with server. Please try again later');

    let search = (params = {}) => {
      if (requestPending) {
        return;
      }

      $rootScope.$broadcast('flightsearch:request-sent');

      requestPending = true;

      $http({
        url: config.flightsApiUrl,
        params: {
          locale: 'en',
          typeFlight: 'return',
          v: 2,
          flyFrom: params.flyFrom.id,
          to: params.flyTo.id,
          dateFrom: params.dateFrom,
          dateTo: params.dateFrom,
          returnFrom: params.dateTo,
          returnTo: params.dateTo
        }
      })
        .then(response => _onSearchSuccess(response))
        .catch(() => _onSearchError())
    };

    let getFlights = () => flights;

    return { search, getFlights }
  })
  .name;
