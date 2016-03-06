import {CollectionView} from 'backbone.marionette';
import ItemView from './item-view';

export default CollectionView.extend({
  className: 'list-group',
  childView: ItemView,

  childViewOptions() {
    return {
      displayAsThumb: !!this.displayAsThumb,
    };
  },

  toggle() {
    // TODO: double-check this, it seems weird
    this.displayAsThumb = !this.displayAsThumb;
    this.render();
  },
});
