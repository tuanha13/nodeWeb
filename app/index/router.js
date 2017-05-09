(function () {
    'use strict';

    // var router = __.express.Router();

    /** get index page */
    __.router.get('/', function (req, res, next) {
        res.render('default', {title: 'Gapi'});
    });
    __.router.get('/data', function (req, res, next) {
        res.render('data', {title: 'Gapi'});
    });

    module.exports = __.router;
})();
