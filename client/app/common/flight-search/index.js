import toastr from 'toastr';

export default angular
  .module('app.flight-search', [])
  .service('flightSearch', function ($http, config, $rootScope) {
    let flights = [];
    let requestPending = false;

    /**
     * @description When the request wass successfull set the data
     *              into our model and then broadcast that for subscribers
     * @param {Object} data - API response
     * @private
     */
    let _onSearchSuccess = data => {
      flights = data;
      requestPending = false;

      $rootScope.$broadcast('flightsearch:results-available');
    };

    let _onSearchError = () =>
      toastr.error('There were an error while communicating with server. Please try again later');

    /**
     * @description Get the available fligts from the SkyPicker's API
     * @param {Object}  params             - Search parameters object
     * @param {String}  params.flyFrom.id  - The id of the selected departure airport
     * @param {String}  params.flyTo.id    - The id of the selected arrival airport
     * @param {Date}    params.dateFrom    - Departure time
     * @param {Date}    params.dateTo      - Departure time
     */
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
