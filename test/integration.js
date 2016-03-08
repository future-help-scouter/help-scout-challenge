var selectXPath = require('casper').selectXPath;


casper.test.begin('basic flow', 7, function suite(test) {
    var bookTitle = 'integration' + Date.now();
    var newBookListSelector = '//*[text()[contains(.,"' + bookTitle + '")]]';

    // list exists
    casper.start('http://localhost:3000/#books', function () {
        casper.wait(250, function () {
            test.assertExists('.books__library .items.list', 'list of books is found');
        });
    });

    // go to add book page
    casper.then(function () {
        var selector = '.page-header .btn-primary';
        casper.waitForSelector(selector, function() {
            this.click(selector);
            test.assertUrlMatch(/books\/new/, 'changed location to new book page');
        });
    });

    // submit form
    casper.then(function () {
        casper.waitForSelector('form', function() {
            this.fill('form', {
                title: bookTitle,
            }, true);
        });
    });

    // redirect to book details
    casper.wait(250, function () {
        test.assertUrlMatch(/books\/\d/, 'on new book details page');
    });

    // go back to list
    casper.then(function () {
        var selector = '.navbar-nav a';
        casper.waitForSelector(selector, function() {
            this.click(selector);
        });
    });

    // toggle grid/list view
    casper.then(function () {
        var selector = '.books__toggle';
        casper.waitForSelector(selector, function() {
            this.click(selector);
        });
    });

    casper.then(function () {
        test.assertExists('.books__library .items.thumbs', 'book thumbnails are showing');
    });

    // open details
    casper.then(function () {
        var selector = 'img[alt="' + bookTitle + '"]';
        casper.waitForSelector(selector, function() {
            this.click(selector);
        });
    });

    casper.wait(250, function () {
        test.assertUrlMatch(/books\/\d/, 'on new book details page');
    });

    // new book is present
    casper.then(function () {
        test.assertExists(selectXPath(newBookListSelector), 'the new book is listed');
    });

    // delete the new book
    casper.then(function () {
        var selector = '.books__destroy';
        casper.waitForSelector(selector, function() {
            this.click(selector);

            casper.wait(500, function () {
                test.assertExists('.modal-dialog .btn-primary', 'modal showing');

                casper.waitForSelector('.modal-dialog .btn-primary', function() {
                    this.click('.modal-dialog .btn-primary');
                });
            });
        });
    });

    casper.run(function() {
        test.done();
    });
});
