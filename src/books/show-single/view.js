import {ItemView} from 'backbone.marionette';
import nprogress from 'nprogress';
import ModalService from '../../modal/service';
import FlashesService from '../../flashes/service';
import {history} from 'backbone';
import template from './template.hbs';
import {bindKey, D} from '../../application/keybinding';

export default ItemView.extend({
  template: template,
  className: 'books books--show container',

  initialize(options = {}) {
    this.model = options.model;
    bindKey(this, D, this.handleKeyPress);
  },

  templateHelpers() {
    return {
      errors: this.model.validationError,
      lang: this.lang,
    };
  },

  events: {
    'click .books__destroy' : 'handleDestroy'
  },

  modelEvents: {
    all: 'render'
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

  handleKeyPress(event) {
    if (event.which === D) {
      // TODO: abstact this into a service.
      this.handleDestroy();
    }
  },
});
