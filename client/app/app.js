import angular from 'angular'

import components from './components/index'
import common from './common/index'

import controller from './controller'
import template from './app.html'
import './app.styl'

angular
  .module('app', [components, common])
  .component('app', {
    template,
    controller,
    restrict: 'E'
  })
  .name;
