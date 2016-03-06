import {Collection} from 'backbone';
import Model from './model';

export default Collection.extend({
  url: '/api/books',
  model: Model,
  // fetch(options = {}) {
  //   console.log(arguments);
  //   console.log(options);
  //   return Collection.prototype.fetch.call(this, options);
  // },
});
