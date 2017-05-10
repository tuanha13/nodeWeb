
(function () {
    'use strict';
    
    /** get page */
    __.router.get('/', function (req, res, next) {
        
        res.render('default', {
            title: 'dashboard'
        });
        res.end();
    });

    module.exports = __.router;
})();


