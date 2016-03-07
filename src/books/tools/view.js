import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {history} from 'backbone';

export default ItemView.extend({
  template: template,
  className: 'books books--tools container',

  initialize(options = {}) {
    this.thumbs = options.thumbs;
    this.descending = options.desc;
  },

  templateHelpers() {
    return {
      lang: this.lang,
      thumbs: this.thumbs,
      ascending: !this.descending,
      descending: this.descending,
    };
  },

  events: {
    'click .books__toggle': 'handleToggle',
    'click .books__sort-direction': 'handleSortDirectionClick',
  },

  handleToggle() {
    this.thumbs = !this.thumbs;
    this.rerouteWithNewParams();
  },

  handleSortDirectionClick() {
    this.descending = !this.descending;
    this.rerouteWithNewParams();
  },

  rerouteWithNewParams() {
    history.navigate(`books?${this.getParams()}`, { trigger: true });
  },

  getParams() {
    // TODO: create a service to maintain param state, update params
    // TODO: include all params (sorting, filter, etc);

    return [
      this.thumbs ? 'thumbs=1' : '',

      this.descending ? 'desc=1' : '',

    ].filter(param => !!param).join('&');

  },
});