import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';
import {lang} from '../application/i18n';

export default LayoutView.extend({
  template: template,
  className: 'container',
  regions: {
    library : '.books__library',
    viewer  : '.books__viewer'
  },
  templateHelpers() {
    return {
      lang,
    };
  },
});
