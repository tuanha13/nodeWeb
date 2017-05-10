(function () {
    'use strict';

    /** get page */
    __.router.get('/', function (req, res, next) {
        res.render('default', {title: 'Gapi'});
    });

    module.exports = __.router;
})();
