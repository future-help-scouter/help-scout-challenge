import {Route} from 'backbone-routing';
import LibraryView from '../library/collection-view';
import {history} from 'backbone';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'fetch', this.onFetch);
    // this.listenTo(this, 'enter', this.onEnter);

    // Originally, when the route loaded, this would redirect
    // to the first book, loading the show route.
    // The show route loads a layout with a list and details.
    // We don't want all that now.  We just want to render the
    // list (aka library).
  },

  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  onEnter() {
    // let id = this.collection.first().get('id');
    // history.navigate(`books/${id}`, {
    //   trigger: true,
    //   replace: true
    // });
  },

  render() {
    // This is how the colors show their list.
    // this.view = new View({
    //   model: this.model
    // });
    // this.container.show(this.view);

    this.view = new LibraryView({
      collection: this.collection
    });
    this.container.show(this.view);

    // return new LibraryView({
    //   collection: this.collection
    // });
  }
});
