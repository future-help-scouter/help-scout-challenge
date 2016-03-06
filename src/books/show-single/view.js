import {ItemView} from 'backbone.marionette';
import nprogress from 'nprogress';
import ModalService from '../../modal/service';
import FlashesService from '../../flashes/service';
import {history} from 'backbone';
import template from './template.hbs';
import {lang} from '../../application/i18n';

export default ItemView.extend({
  template: template,
  className: 'colors colors--show container',

  initialize(options = {}) {
    this.model = options.model;
  },

  templateHelpers() {
    return {
      errors: this.model.validationError,
      lang,
    };
  },

  events: {
    'click .colors__toggle' : 'handleToggle',
    'click .colors__destroy' : 'handleDestroy'
  },

  modelEvents: {
    all: 'render'
  },

  handleToggle() {
    this.model.set('active', !this.model.get('active'));
    this.model.save().fail(() => this.handleToggleFailure());
  },

  handleToggleFailure() {
    this.model.set('active', this.model.previous('active'));
  },

  handleDestroy() {
    ModalService.request('confirm', {
      title : lang.confirmBookDestroyTitle,
      text  : lang.confirmBookDestroyMessage,
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
      title   : lang.bookDestroyedTitle,
      body    : lang.bookDestroyedMessage,
    });
  }
});
