import {ItemView} from 'backbone.marionette';
import template from './item-template.hbs';
import gridTemplate from './grid-template.hbs';

export default ItemView.extend({

  getTemplate(){
    const {displayAsThumb} = this.options;

    if (displayAsThumb){
      return gridTemplate;
    } else {
      return template;
    }
  },

  tagName: 'a',

  attributes() {
    const active = (this.model.isActive() ? 'active' : '');

    return {
      class : `list-group-item ${active}`,
      href  : `#books/${this.model.get('id')}`
    };
  },

  templateHelpers() {
    const {displayAsThumb} = this.options;
    return {
      displayAsThumb,
    };
  },
});
