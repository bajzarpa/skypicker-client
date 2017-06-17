import controller from './controller'
import template from './template.html'

export default angular
  .module('app.result', [])
  .component('searchResult', {
    template,
    controller,
    bindings: {
      data: '<'
    }
  })
  .name
