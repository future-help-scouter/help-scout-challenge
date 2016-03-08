import {history} from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';
import {bindKey, A} from '../application/keybinding';

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
    bindKey(this, A, this.handleKeyPress);
  },

  handleKeyPress(event) {
    if (event.which === A) {
      // TODO: abstact this into a service.
      history.navigate('#books/new', { trigger: true });
    }
  },
});
