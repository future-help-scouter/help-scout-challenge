import nprogress from 'nprogress';
import {ItemView} from 'backbone.marionette';
import FormBehavior from '../../forms/behavior';
import {history} from 'backbone';
import template from './template.hbs';
import storage from '../storage';

export default ItemView.extend({
  template: template,
  className: 'books books--create container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  initialize() {
    this.customFields = [];
  },

  templateHelpers() {
    return {
      errors: this.errors,
      lang: this.lang,
      customFields: this.customFields,
    };
  },

  events: {
    'submit form': 'create',
    'click .books__create': 'create',
    'click .books__add-field': 'handleAddField',
  },

  create() {
    let errors = this.model.validate(this.form);

    if (errors) {
      this.errors = errors;
      this.render();
    } else {
      this.model.set(this.form);
      this.saveBook();
    }
  },

  saveBook() {
    nprogress.start();
    storage.save(this.model).then(() => {
      nprogress.done();
      history.navigate(`books/${this.model.id}`, { trigger: true });
    }, (/*err*/) => {
      // TODO: handle save failure
    });
  },

  handleAddField(event) {
    event.preventDefault();

    this.customFields.push({
      id: this.customFields.length,
      fieldNamePlaceholder: this.lang.create.fieldNamePlaceholder,
      name: 'custom-' + this.customFields.length,
    });
    this.render();
  },
});
