import {Route} from 'backbone-routing';
import LibraryView from '../library/collection-view';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.layout = options.layout;
    this.container = options.container;
    this.listenTo(this, 'fetch', this.onFetch);
  },

  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  render() {
    this.library = new LibraryView({
      collection: this.collection
    });

    this.layout.library.show(this.library);
    // this.layout.viewer.show(this.viewer);
  }
});
