import moment from 'moment'
import flatpickr from 'flatpickr'
import toastr from 'toastr'

export default class SearchController {
  constructor(placeSearch, flightSearch) {
    "ngInject";

    this._placeSearch = placeSearch;
    this._flightSearch = flightSearch;

    this.places = [];

    this.flightDetails = {
      flyFrom: '',
      flyTo: '',
      dateFrom: '',
      dateTo: '',
      displayDate: ''
    }
  }

  $onInit() {
    this._initDatePicker();
  }

  _initDatePicker() {
    flatpickr('.date-range', {
      mode: 'range',
      minDate: 'today',
      onChange: dates => this._onDatepickerChange(dates)
    })
  }

  _onDatepickerChange(dates) {
    const FROM_ARRAY_INDEX = 0;
    const TO_ARRAY_INDEX = 1;

    this.flightDetails.dateFrom = moment(dates[FROM_ARRAY_INDEX]).format('DD/MM/YYYY');
    this.flightDetails.dateTo = moment(dates[TO_ARRAY_INDEX]).format('DD/MM/YYYY');
  }

  onSearchSubmit() {
    if (this._validateFlightDetails()) {
      this._flightSearch
        .search(this.flightDetails)
    }
  }

  _validateFlightDetails() {
    return this.flightDetails.dateFrom !== '' &&
     this.flightDetails.dateTo !== '' &&
     this.flightDetails.flyFrom !== '' &&
     this.flightDetails.flyTo !== ''
  }

  onPlaceSearch(keyword) {
    const MIN_KEYWORD_LENGTH = 3;

    if (keyword.length < MIN_KEYWORD_LENGTH) {
      return;
    }

    this._placeSearch
      .lookUp(keyword)
      .then(response => this._onPlaceSearchSuccess(response.data))
      .catch(() => SearchController._onPlaceSearchError())
  }

  _onPlaceSearchSuccess(data) {
    this.places = data;
  }

  static _onPlaceSearchError() {
    toastr.error('Failed to get suggestions. Please try again later');
  }
}
