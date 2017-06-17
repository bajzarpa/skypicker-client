export default class SearchResultsController {
  constructor() {
    this.results = null;
  }

  $onChanges() {
    console.log(this.results)
  }
}
