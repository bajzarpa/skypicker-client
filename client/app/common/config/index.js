import configFn from '../../config';

export default angular
  .module('config', [])
  .service('Config', configFn)
  .name;
