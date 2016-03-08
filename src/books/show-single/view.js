import {ItemView} from 'backbone.marionette';
import nprogress from 'nprogress';
import ModalService from '../../modal/service';
import FlashesService from '../../flashes/service';
import {history} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'books books--show container',

  initialize(options = {}) {
    this.model = options.model;
  },

  templateHelpers() {
    return {
      errors: this.model.validationError,
      lang: this.lang,
      customFields: this.getCustomFields(),
    };
  },

  getCustomFields() {
    var data = this.model.toJSON();
    return Object.keys(data)
      .filter(fieldName => fieldName.match(/^custom/))
      .map(fieldName => {
        return {
          name: fieldName,
          value: data[fieldName],
        };
      });
  },

  events: {
    'click .books__destroy' : 'handleDestroy'
  },

  modelEvents: {
    all: 'render'
  },

  behaviors: {
    KeyBind: {
      d: 'handleDestroy',
    },
  },

  handleDestroy() {
    // TODO: focus on ok button
    ModalService.request('confirm', {
      title : this.lang.confirmBookDestroyTitle,
      text  : this.lang.confirmBookDestroyMessage,
    }).then(confirmed => {
      if (confirmed) {
        nprogress.start();

        return this.model.destroy({ wait: true })
          .then(() => this.handleDestroySuccess());
      }
    });
  },

  handleDestroySuccess() {
    nprogress.done();
    history.navigate('books', { trigger: true });
    FlashesService.request('add', {
      timeout : 5000,
      type    : 'info',
      title   : this.lang.bookDestroyedTitle,
      body    : this.lang.bookDestroyedMessage,
    });
  },
});
