import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {lang} from '../../application/i18n';

export default ItemView.extend({
  template: template,
  className: 'books books--tools container',

  templateHelpers() {
    return {
      lang,
    };
  },

  events: {
    // 'click .books__toggle' : 'handleToggle',
  },

  triggers: {
    'click .books__toggle' : 'books:list:toggle',
  },

  // handleToggle() {
  //   console.log('toggle list view');
  // },
});