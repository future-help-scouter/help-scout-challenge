var Backbone = require('backbone');
var fixture = require('./fixture').map(function addDate(item) {
  return Object.assign(item, {
    date: new Date(item.year),
  });
});
var collection = new Backbone.Collection(fixture);

var id = collection.length;

// TODO: move utilities into helpers module
var getComparableValues = function (a, b) {
  if (typeof a === 'string' || typeof b === 'string') {
    a = (a + '').toLowerCase();
    b = (b + '').toLowerCase();
  }
  return [a, b];
};

// case-insensitive sorting
var sortArray = function (arr, field, ascending) {
  var direction = ascending ? 1 : -1;

  return arr.sort(function (a, b) {
    var result = 0;
    var comparable = getComparableValues(a.get(field), b.get(field));

    if (comparable[0] > comparable[1]) {
      result = 1 * direction;
    } else if (comparable[0] < comparable[1]) {
      result = -1 * direction;
    }

    return result;
  });
};

// ===============================================================================


module.exports = function(api) {
  api.route('/api/books')
    .get(function(req, res) {

      var field = req.query.field || 'title';
      var desc = req.query.desc === 'true';

      // Use custom sort instead of _.sortBy for case-insensitive sorting.
      var books = sortArray(collection.models, field, !desc);

      res.json(books);
    })
    .post(function(req, res) {
      var model = new Backbone.Model(req.body);
      model.set('id', ++id);
      model.set('date', Date.now());
      collection.add(model);
      res.json(model);
    });

  api.route('/api/books/:id')
    .get(function(req, res) {
      var model = collection.get(req.params.id);
      res.json(model);
    })
    .delete(function(req, res) {
      var model = collection.get(req.params.id);
      collection.remove(model);
      res.json(collection);
    });
};
