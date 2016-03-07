import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import {history} from 'backbone';

export default ItemView.extend({
  template: template,
  className: 'books books--tools container',

  initialize(options = {}) {
    this.thumbs = options.thumbs;
    this.descending = options.desc;
    this.field = options.field || 'title';
  },

  templateHelpers() {
    // TODO: move this somewhere more controlled
    let sortFields = [
      {
        name: 'title',
        lang: this.lang.book.title,
      },
      {
        name: 'date',
        lang: this.lang.tools.dateAdded,
      }
    ];

    let inactiveSortFields = sortFields
      .filter(field => field.name !== this.field);

    return {
      lang: this.lang,
      thumbs: this.thumbs,
      activeSortField: sortFields.find(field => field.name === this.field),
      inactiveSortFields,
    };
  },

  events: {
    'click .books__toggle': 'handleToggle',
    'click .books__sort-direction': 'handleSortDirectionClick',
    'click .books__sort-title': 'handleSortTitleClick',
    'click .books__sort-date': 'handleSortDateClick',
  },

  handleToggle() {
    this.thumbs = !this.thumbs;
    this.rerouteWithNewParams();
  },

  handleSortDirectionClick() {
    this.descending = !this.descending;
    this.rerouteWithNewParams();
  },

  handleSortTitleClick(event) {
    event.preventDefault();
    this.field = 'title';
    this.rerouteWithNewParams();
  },

  handleSortDateClick(event) {
    event.preventDefault();
    this.field = 'date';
    this.rerouteWithNewParams();
  },

  rerouteWithNewParams() {
    history.navigate(`books?${this.getParams()}`, { trigger: true });
  },

  getParams() {
    // TODO: create a service to maintain param state, update params
    // TODO: include all params (sorting, filter, etc);

    return [
      this.thumbs ? 'thumbs=1' : '',

      this.descending ? 'desc=1' : '',

      this.field ? `field=${this.field}` : '',

    ].filter(param => !!param).join('&');

  },
});