import $ from 'jquery';
import {Behavior} from 'backbone.marionette';

const EVENT = 'keypress';

/**
* Get the char code for a character.
* @param {String} char
* @return {Number}
*/
export function getCode(char) {
  return char.charCodeAt(0);
}

function getCodeChecker(code, viewHandler) {
  return function (event) {
    if (event.which === code) {
      viewHandler(event);
    }
  };
}

export default Behavior.extend({
  initialize(options = {}) {
    this.createKeyBindings(options);
  },

  createKeyBindings(options) {
    const me = this;

    // keep each in a map so we can remove them selectively
    this.bindings = {};

    Object.keys(options).forEach(char => {
      let handler = options[char];
      let code = getCode(char);

      this.bindings[char] = getCodeChecker(code, me.view[handler]);
      $('body').bind(EVENT, this.bindings[char]);
    });
  },

  onBeforeDestroy() {
    Object.keys(this.bindings).forEach(char => {
      $('body').unbind(EVENT, this.bindings[char]);
    });
  },
});
