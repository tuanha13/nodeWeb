
(function () {
    'use strict';

    var router = __.express.Router();

    /** get test page */
    router.get('/', function (req, res, next) {
        console.log('--->>>');
        res.write('hello');
        res.end();
    });

    router.get('/testId/:id', function (req, res, next) {
        console.log('--->>>', req.params['id']);
        res.write('hello');
        res.end();
    });

    module.exports = router;
})();


