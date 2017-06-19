export default angular
  .module('app.place-search', [])
  .service('placeSearch', function($http, config) {

    /**
     * @description Get the list of airports or counties by keyword
     * @param {String} keyword
     * @returns {Object<Promise>}
     */
    let lookUp = (keyword) => {
      return $http({
        url: config.placesApiUrl,
        params: {
          'term': keyword,
          'v': 2,
          'locale': 'en'
        }
      })
    };

    return { lookUp }
  })
  .name;
