import {Route} from 'backbone-routing';
import LibraryView from '../library/collection-view';
import {history} from 'backbone';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    // This dude needs to be given a layout.
    this.layout = options.layout;

    this.container = options.container;
    this.listenTo(this, 'fetch', this.onFetch);
    // this.listenTo(this, 'enter', this.onEnter);
  },

  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  onEnter() {
  },

  render() {
    // This is how the colors show their list.
    // this.view = new View({
    //   model: this.model
    // });
    // this.container.show(this.view);

    // this.view = new LibraryView({
    //   collection: this.collection
    // });
    // this.container.show(this.view);

    // Once we have a layout, plug in the sub-components...

    this.library = new LibraryView({
      collection: this.collection
    });

    // this.viewer = new ViewerView({
    //   model: this.model
    // });

    this.layout.library.show(this.library);
    // this.layout.viewer.show(this.viewer);
  }
});
