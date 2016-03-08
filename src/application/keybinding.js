import $ from 'jquery';

export const A = 97;
export const D = 100;

export function bindKey(view, key, handler) {
  // TODO: unbind when destroying
  $('body').bind('keypress', handler.bind(view));
}
