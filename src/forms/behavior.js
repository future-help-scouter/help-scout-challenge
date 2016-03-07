import $ from 'jquery';
import Syphon from 'backbone.syphon';
import {Behavior} from 'backbone.marionette';

export default Behavior.extend({
  events: {
    'submit form' : 'handleSubmit',
    'change form' : 'serialize',
    'keypress form': 'handleKeyPress',
  },

  initialize() {
    this.listenTo(this.view.options.model, 'change', this.onChange);
  },

  serialize() {
    this.view.form = Syphon.serialize(this);
  },

  deserialize() {
    return Syphon.deserialize(this, this.view.form);
  },

  onChange() {
    this.view.form = this.view.model.attributes;
    this.deserialize();
  },

  onBeforeRender() {
    if (this.view.form) {
      this.serialize();
    }
  },

  onDomRefresh() {
    if (!this.view.form) {
      this.view.form = this.view.model.attributes;
    }
    this.deserialize();
  },

  handleSubmit(event) {
    event.preventDefault();
    this.view.form = Syphon.serialize(this);
  },

  handleKeyPress(event) {
    if (event.which === 13 && event.target.tagName !== 'TEXTAREA') {
      $(event.target).closest('form').submit();
    }
  },
});
