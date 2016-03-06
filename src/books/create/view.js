import nprogress from 'nprogress';
import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../forms/behavior';
import {history} from 'backbone';
import template from './template.hbs';
import storage from '../storage';
import {lang} from '../../application/i18n';

export default ItemView.extend({
  template: template,
  className: 'colors colors--create container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  templateHelpers() {
    return {
      errors: this.errors,
      lang,
    };
  },

  events: {
    'submit form': 'handleSubmit',
    'click .cancel': 'handleCancel',
  },

  handleSubmit() {
    let errors = this.model.validate(this.form);

    if (errors) {
      this.errors = errors;
      this.render();
    } else {
      nprogress.start();
      this.model.set(this.form);
      storage.save(this.model).then(() => {
        nprogress.done();
        history.navigate(`books/${this.model.id}`, { trigger: true });
      }, (/*err*/) => {
        // TODO: handle save failure
      });
    }
  },

  handleCancel() {
    history.navigate('books', { trigger: true });
  },
});
