export default class AppController {
  constructor($scope, flightSearch) {
    "ngInject";

    this._$scope = $scope;
    this._flightSearch = flightSearch;
    this.results = [];
    this.loading = false;
  }

  $onInit() {
    this.eventListeners();
  }

  eventListeners() {
    /**
     * Subscribe to flighSearch service
     */
    this._$scope.$on('flightsearch:results-available', () => this._onFlightResultsAvailable());
    this._$scope.$on('flightsearch:request-sent', () => this._onFlightSearchRequestSent());
  }

  _onFlightSearchRequestSent() {
    this.loading = true;
  }

  _onFlightResultsAvailable() {
    this.loading = false;
    this.results = this._flightSearch.getFlights();
  }
}
