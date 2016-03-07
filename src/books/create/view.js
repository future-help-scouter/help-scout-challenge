import $ from 'jquery';
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

    'change .books__custom-field-label': 'handleCustomFieldLabelChange',

    // shortcuts
    // TODO: move this to a behavior
    'keypress': 'handleKeyPress',
  },

  create() {
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

  handleAddField(event) {
    event.preventDefault();

    this.customFields.push({
      id: this.customFields.length,
      fieldNamePlaceholder: this.lang.create.fieldNamePlaceholder,
      name: 'custom-' + this.customFields.length,
    });
    this.render();
    // history.navigate('books', { trigger: true });
  },

  handleCustomFieldLabelChange(event) {
    let fieldLabel = $(event.target);
    let id = fieldLabel.data('customFieldId');

    // update field's name
    let customFieldIndex = this.customFields.findIndex(field => field.id === id);
    let customField = this.customFields[customFieldIndex];
    customField.name = fieldLabel.val();

    this.customFields.splice(customFieldIndex, 1, customField);

    this.render();
  },

  handleKeyPress(event) {
    console.log('handleKeyPress', event);
  },
});
