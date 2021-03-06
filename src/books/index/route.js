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
    const {desc, field} = this.getParamOptions();
    let options = {
      data: {
        desc,
        field,
      },
    };

    // Force a fetch so the backend can handle sorting, filtering,
    // and paging for us.
    // TODO: Do not force a fetch if we're just changing
    // to/from thumbs view.
    return storage.findAll(options, true).then(collection => {
      this.collection = collection;
    });
  },

  getParamOptions() {
    return {
      thumbs: !!this.query.thumbs,
      desc: !!this.query.desc,
      field: this.query.field,
    };
  },

  render() {
    const {thumbs, desc, field} = this.getParamOptions();

    this.library = new LibraryView({
      collection: this.collection,
      thumbs,
      desc,
      field,
    });

    this.tools = new ToolsView({
      thumbs,
      desc,
      field,
    });

    this.layout.library.show(this.library);
    this.layout.tools.show(this.tools);
  },
});
