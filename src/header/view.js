import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {lang} from '../application/i18n';

export default ItemView.extend({
  template: template,
  tagName: 'nav',
  className: 'header navbar navbar-default navbar-fixed-top',

  attributes: {
    role: 'navigation'
  },

  collectionEvents: {
    all: 'render'
  },

  templateHelpers() {
    return {
      lang,
      primaryItems   : this.serializeWhere({ type: 'primary' }),
      secondaryItems : this.serializeWhere({ type: 'secondary' })
    };
  },

  serializeWhere(props) {
    return _.invoke(this.collection.where(props), 'toJSON');
  },

  ui: {
    collapse: '#navbar-collapse'
  },

  events: {
    'show.bs.collapse #navbar-collapse' : 'onCollapseShow'
  },

  onCollapseShow() {
    this.listenToOnce(history, 'route', () => {
      this.ui.collapse.collapse('hide');
    });
  }
});
