var Backbone = require('backbone');
var fixture = require('./fixture');
var collection = new Backbone.Collection(fixture);

var id = collection.length;

module.exports = function(api) {
  api.route('/api/books')
    .get(function(req, res) {
      res.json(collection);
    })
    .post(function(req, res) {
      var model = new Backbone.Model(req.body);
      model.set('id', ++id);
      collection.add(model);
      res.json(model);
    });

  api.route('/api/books/:id')
    .get(function(req, res) {
      var model = collection.get(req.params.id);
      res.json(model);
    });
};
