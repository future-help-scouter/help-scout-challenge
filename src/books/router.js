import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import LayoutView from './layout-view';
import IndexRoute from './index/route';
import ShowRoute from './show/route';
import AddRoute from './add/route';
import {lang} from '../application/i18n';

export default Router.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.listenTo(this, 'before:enter', this.onBeforeEnter);

    HeaderService.request('add', {
      name: lang.books,
      path: 'books',
      type: 'primary'
    });

    HeaderService.request('add', {
      name: lang.add,
      path: 'add-book',
      type: 'secondary'
    });
  },

  onBeforeEnter() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
    HeaderService.request('activate', {
      path: 'books'
    });
  },

  routes: {
    'books'     : 'index',
    'books/:id' : 'show',

    'add-book' : 'addBook',
  },

  index() {
    return new IndexRoute();
  },

  show() {
    return new ShowRoute({
      layout: this.layout
    });
  },

  addBook() {
    return new AddRoute();
  },
});
