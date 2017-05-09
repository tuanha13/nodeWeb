(function () {
    'use strict';

    /** 
     * global variables, functions 
     */
    global.rootRequire = function (name) {
        return require(__dirname + '/' + name);
    };
    global._ = require('underscore');
    global.__ = rootRequire('app/setting');
    global.adminPath = __.adminPath;

    __.app.listen(__.http.port, function () {
        console.log('Start server listening at http://%s:%s', __.http.ip, __.http.port);
    });

    /**
     * listen router admin site
     */
    var routersAdmin = __.helper.getRouters();
    _.each(routersAdmin, function (router) {
        __.app.use(router.path, require(router.middleware));
    });

    
    __.app.use(function(req, res, next) {
        var url = req.url;

        if (url === '/') {
            res.redirect('/home');
        }
        next();
    });
})();
