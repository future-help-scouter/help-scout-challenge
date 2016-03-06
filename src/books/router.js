import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import LayoutView from './layout-view';
import IndexRoute from './index/route';
import CreateRoute from './create/route';
import ShowRoute from './show/route';
import ShowSingleRoute from './show-single/route';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);

    HeaderService.request('add', {
      name: 'Books',
      path: 'books',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    this.createLayoutView();
    HeaderService.request('activate', {
      path: 'books'
    });
  },

  createLayoutView() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
  },

  isLayoutComplete() {
    const {layout = {}} = this;
    const {library} = layout;
    return !!library;
  },

  routes: {
    'books'     : 'index',
    'books/new' : 'create',
    // 'books/:id' : 'show',
    'books/:id' : 'showSingle',
  },

  index() {
    return new IndexRoute();
  },

  create() {
    return new CreateRoute({
      container: this.container
    });
  },

  show() {
    if (!this.isLayoutComplete()) {
      // TODO: listen to another event to make sure this is set
      // up correctly
      this.createLayoutView();
    }

    return new ShowRoute({
      layout: this.layout
    });
  },

  showSingle() {
    return new ShowSingleRoute({
      container: this.container
    });
  }
});
