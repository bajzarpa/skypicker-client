import config from './config'
import places from './place-search'
import flights from './flight-search'

export default angular
  .module('common', [config, places, flights])
  .name;
