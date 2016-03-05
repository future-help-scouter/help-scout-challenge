/**
* This persistence layer acts as a poor man's database.
* We could easily change the implementation here to use
* Mongoose or something else, but I didn't want to expose
* any trace of my identity through connection scripts.
*/

var id = 0;
var _books = [];

var deref = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

var addBook = function (book) {
    Object.assign(book, { id: id++ });
    _books.push(book);
    return deref(book);
};

var sort = function (arr, field, ascending) {
    var direction = ascending ? 1 : -1;

    return arr.sort(function (a, b) {
        var aField = (a[field] + '').toLowerCase();
        var bField = (b[field] + '').toLowerCase();

        if (aField > bField) {
            return 1 * direction;
        } else if (aField < bField) {
            return -1 * direction;
        } else {
            return 0;
        }
    });
};

/**
* Get a sorted list of books.
* @param {String} [sortByField='id']
* @param {Boolean} [ascending=true]
* @return {Object[]}
*/
var getBooks = function (sortByField, ascending) {
    var books = sort(
        _books,
        sortByField || 'id',
        (typeof ascending === 'undefined') ? true : ascending
    );
    return deref(books);
};

/**
* Get the first match by field
* @param {*} value
* @param {String} [field='id']
* @param {Object} undefined if no match
*/
var getBook = function (value, field) {
    field = field || 'id';
    return _books.find(function (book) {
        return book[field] === value;
    });
};

var getBookIndex = function (id) {
    return _books.indexOf(getBook(id));
};

var updateBook = function (book) {
    var index = getBookIndex(id);
    _books.splice(index, 1, book);
    return deref(book);
};

var deleteBook = function (id) {
    var index = getBookIndex(id);
    _books.splice(index, 1);
};

var load = function (books) {
    _books = deref(books);
    id = _books.length;
};

module.exports = {
    load: load,
    addBook: addBook,
    getBook: getBook,
    getBooks: getBooks,
    updateBook: updateBook,
    deleteBook: deleteBook,
};

// ===============================================================================
// quick and dirty tests to verify "database" works
// (function () {
//     var assert = require('assert');
//     var api = module.exports;

//     (function () {
//         assert((api.getBooks().length === 0));

//         api.addBook({ title: 'a' });
//         assert((api.getBooks().length === 1));
//         assert((api.getBooks()[0].id === 0));

//         api.addBook({ title: 'b' });
//         assert((api.getBooks()[1].id === 1));

//         assert(api.addBook({ title: 'c' }).id === 2);

//         assert(api.getBooks('id', false)[0].id === 2);

//         api.addBook({ title: 'A' });

//         assert(api.getBooks('title', false)[0].title === 'c');

//         assert(api.getBooks()[1].id === 1);
//     }());

//     // find and update
//     (function () {
//         var book = { title: 'update me' };
//         var id;

//         book = api.addBook(book);
//         id = book.id;

//         book.title = 'new title';
//         book.someOtherField = 'woo!';

//         assert(api.getBook(id).id === id);

//         assert(api.getBook(id) !== book);
//         api.updateBook(book);

//         assert(api.getBook(id).title === 'new title');
//     }());

//     // delete
//     (function () {
//         var book = {title: 'delete me'};
//         var id = addBook(book).id;
//         assert(!!getBook('delete me', 'title'));
//         deleteBook(id);
//         assert(getBook('delete me', 'title') === undefined);
//     }());
// }());
