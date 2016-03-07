import {Model} from 'backbone';
import {Router} from 'backbone-routing';
import {ItemView} from 'backbone.marionette';

export const English = 'en';

function loadStrings(/*languageCode*/) {
  // Yeah, I don't have any other languages defined.
  return require('./strings/en').default;
}

export function setLang(languageCode) {
  // TODO: add interpolation to personalize messages

  // Add lang to all ItemViews for convenience.
  // TODO: Is there a better or more common way to do this?
  // http://ricostacruz.com/backbone-patterns/mixins.html
  ItemView.prototype.lang =
  Model.prototype.lang =
  Router.prototype.lang =
  loadStrings(languageCode);
}
