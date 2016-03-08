import {history} from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

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

  behaviors: {
    KeyBind: {
      a: 'createBook',
    },
  },

  createBook() {
    history.navigate('#books/new', { trigger: true });
  },
});
