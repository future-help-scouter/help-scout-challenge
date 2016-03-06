import {CollectionView} from 'backbone.marionette';
import ItemView from './item-view';
import template from './collection-template.hbs';

export default CollectionView.extend({
  template: template,

  templateHelpers() {
    return {
      displayAsThumb: !!this.displayAsThumb,
    };
  },

  getChildView() {
    return !!this.displayAsThumb ? ItemView : ItemView;
  },

  // attributes() {
  //   return {
  //     class: (!!this.displayAsThumb ? '' : 'list-group'),
  //   };
  // },

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
