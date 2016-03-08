import Marionette from 'backbone.marionette';
import KeyBind from './KeyBind';

let behaviors = {
  KeyBind,
};

export default function (app) {
  app.behaviors = behaviors;
  Marionette.Behaviors.behaviorsLookup = () => {
    return app.behaviors;
  };
}
