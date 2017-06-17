import 'ui-select'
import ngSanitize from 'angular-sanitize'
import template from './template.html'
import controller from './controller'
import './style.styl'

export default angular
  .module('app.search', ['ui.select', ngSanitize])
  .component('searchForm', {
    template,
    controller
  })
  .name
