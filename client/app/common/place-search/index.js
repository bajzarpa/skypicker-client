export default angular
  .module('app.place-search', [])
  .service('placeSearch', function($http, config) {
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
