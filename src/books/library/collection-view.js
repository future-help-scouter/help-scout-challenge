import {CompositeView} from 'backbone.marionette';
import template from './collection-template.hbs';

import ItemView from './item-view';
import ItemViewGrid from './item-view-grid';

export default CompositeView.extend({
  // TODO: see if we can use CollectionView now that we are not rerendering
  template,
  childViewContainer: '.items',

  initialize(options = {}) {
    this.thumbs = options.thumbs;
  },

  templateHelpers() {
    // TODO: lang
    return {
      listStyle: !!this.thumbs ? 'thumbs' : 'list',
    };
  },

  getChildView() {
    return !!this.thumbs ? ItemViewGrid : ItemView;
  }
});
