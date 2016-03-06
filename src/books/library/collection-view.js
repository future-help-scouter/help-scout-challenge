import {CompositeView} from 'backbone.marionette';
import template from './collection-template.hbs';

import ItemView from './item-view';
import ItemViewGrid from './item-view-grid';

export default CompositeView.extend({

  template,
  childViewContainer: '.items',

  templateHelpers() {
    // TODO: lang
    return {
      listStyle: !!this.displayAsThumb ? 'thumbs' : 'list',
    };
  },

  getChildView() {
    return !!this.displayAsThumb ? ItemViewGrid : ItemView;
  },

  toggle() {
    // TODO: double-check this, it seems weird
    this.displayAsThumb = !this.displayAsThumb;

    // Use a composite view so that when rerendering, we can
    // swap the class used to indicate list/thumbs.
    this.render();
  },
});
