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

    // force a fetch so the backend can handle sorting and filtering for us
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
