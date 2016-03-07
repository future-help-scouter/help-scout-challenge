import {Model} from 'backbone';
import {ItemView} from 'backbone.marionette';

const en = {
  destroy: 'Destroy',
  edit: 'Edit',
  cancel: 'Cancel',
  ok: 'OK',
  submit: 'Submit',
  back: 'Back',

  book: {
    title: 'Title',
    author: 'Author',
    year: 'Year',
    description: 'Description',
    image: 'Image',
  },

  confirmBookDestroyTitle: 'Confirm Book Destruction',
  confirmBookDestroyMessage: 'Are you sure you want to destroy this book?',

  bookDestroyedTitle: 'It\'s gone!',
  bookDestroyedMessage: 'That book will bother you no more.',

  layout: {
    title: 'Books',
    createBtn: 'Add a Book',
  },

  create: {
    title: 'Add a Book',
    createBtn: 'Create',
    requiredFieldError: 'This field is required.',
  },
};

export const EN = 'English';

export function setLang(languageCode) {
  let lang;

  // Yeah, I don't have any other languages defined.
  if (languageCode === EN || true) {
    lang = en;
  }

  // TODO: add interpolation to personalize messages

  // Add lang to all ItemViews for convenience.
  // TODO: Is there a better or more common way to do this?
  // http://ricostacruz.com/backbone-patterns/mixins.html
  ItemView.prototype.lang =
  Model.prototype.lang = lang;
}
