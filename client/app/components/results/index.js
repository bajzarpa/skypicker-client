import result from 'components/result'
import controller from './controller'
import template from './template.html'

export default angular
  .module('app.results', [result])
  .component('searchResults', {
    template,
    controller,
    bindings: {
      results: '<'
    }
  })
  .name
