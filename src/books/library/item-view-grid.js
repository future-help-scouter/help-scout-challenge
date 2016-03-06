import {ItemView} from 'backbone.marionette';
import template from './grid-template.hbs';

export default ItemView.extend({
  template,
  tagName: 'a',

  attributes() {
    return {
      class : 'grid-item',
      href  : `#books/${this.model.get('id')}`
    };
  },

  templateHelpers() {
    // TODO: lang
    return {
    };
  },
});
