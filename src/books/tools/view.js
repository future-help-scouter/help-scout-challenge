import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {history} from 'backbone';
import {lang} from '../../application/i18n';

export default ItemView.extend({
  template: template,
  className: 'books books--tools container',

  initialize(options = {}) {
    this.thumbs = options.thumbs;
  },

  templateHelpers() {
    return {
      lang,
      thumbs: this.thumbs,
    };
  },

  events: {
    'click .books__toggle' : 'handleToggle',
  },

  handleToggle() {
    this.thumbs = !this.thumbs;
    history.navigate(`books?${this.getParams()}`, { trigger: true });
  },

  getParams() {
    // TODO: create a service to maintain param state, update params
    // TODO: include all params (sorting, filter, etc);
    return this.thumbs ? 'thumbs=1' : '';
  },
});