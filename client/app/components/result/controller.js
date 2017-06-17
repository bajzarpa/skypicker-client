import moment from 'moment';

export default class SearchResultController {
  constructor() {
    this.data = null;
  }

  normalizeDate(date) {
   return moment.unix(date).format('YYYY-MM-DD H:m');
  }
}
