import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/books',
  isActive() {
    return this.collection.active === this;
  },

  validate(attrs = {}) {
    let errors = {};

    // TODO: create generic validators that return message
    if (!attrs.title) {
      errors.title = this.lang.create.requiredFieldError;
    }

    return Object.keys(errors).length ? errors : undefined;
  },
});
