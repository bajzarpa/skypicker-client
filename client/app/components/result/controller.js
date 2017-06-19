import moment from 'moment';

export default class SearchResultController {
  constructor() {
    this.data = null;
  }

  /**
   * @description Convert and format the given UNIX timestamp
   * @param {String|Number} date - unix timestamp
   * @returns {string} - fromatted date
   */
  normalizeDate(date) {
   return moment.unix(date).format('YYYY-MM-DD H:m');
  }
}
