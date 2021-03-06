import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';

export default ItemView.extend({
  template,
  tagName: 'a',

  attributes() {
    return {
      class : 'list-group-item',
      href  : `#books/${this.model.get('id')}`
    };
  },

  templateHelpers() {
    // TODO: lang
    return {
    };
  },
});
