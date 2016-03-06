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
    const {desc} = this.getParamOptions();
    let options = {
      data: {
        desc,
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
    };
  },

  render() {
    const {thumbs, desc} = this.getParamOptions();

    this.library = new LibraryView({
      collection: this.collection,
      thumbs,
      desc,
    });

    this.tools = new ToolsView({
      thumbs,
      desc,
    });

    this.layout.library.show(this.library);
    this.layout.tools.show(this.tools);
  },
});
