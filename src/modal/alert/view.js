import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './template.hbs';
import {lang} from '../../application/i18n';

export default ItemView.extend({
  template: template,

  initialize(options = {}) {
    this.model = new Model(options);
  },

  triggers: {
    'click .btn-primary' : 'confirm',
    'click .close'       : 'cancel'
  },

  templateHelpers() {
    return {
      lang,
    };
  },
});
