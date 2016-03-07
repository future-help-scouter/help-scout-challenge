import $ from 'jquery';
import {history} from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

// TODO: move to keycodes
const A = 97;

export default LayoutView.extend({
  template: template,
  className: 'container',
  regions: {
    library : '.books__library',
    tools   : '.books__tools',
  },
  templateHelpers() {
    return {
      lang: this.lang,
    };
  },

  events: {
    // TODO: move this to a behavior
    'keypress .books__keypress': 'handleKeyPress',
  },

  initialize() {
    // TODO: unbind when destroying
    $('body').bind('keypress', this.handleKeyPress.bind(this));
  },

  handleKeyPress(event) {
    if (event.which === A) {
      history.navigate('#books/new', { trigger: true });
    }
  },
});
