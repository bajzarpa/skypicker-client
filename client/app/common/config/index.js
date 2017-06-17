import configFn from '../../config';

export default angular
  .module('config', [])
  .service('config', configFn)
  .name;
