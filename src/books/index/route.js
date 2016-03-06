import {Route} from 'backbone-routing';
import LibraryView from '../library/collection-view';
import ToolsView from '../tools/view';
import storage from '../storage';

export default Route.extend({
  initialize(options = {}) {
    this.query = options.query;
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
      collection: this.collection,
      thumbs: !!this.query.thumbs,
      desc: !!this.query.desc,
    });

    this.tools = new ToolsView({
      thumbs: !!this.query.thumbs,
      desc: !!this.query.desc,
    });

    this.layout.library.show(this.library);
    this.layout.tools.show(this.tools);
  },
});
