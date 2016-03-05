import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {lang} from '../application/i18n';

export default ItemView.extend({
  template: template,
  className: 'index',
  templateHelpers() {
    return {
      lang,
    };
  },
});
