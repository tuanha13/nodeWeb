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


    __.app.use(function (req, res, next) {
        var url = req.url;

        if (url === adminPath) {
            res.redirect(adminPath + '/dashboard');
        }
        next();
    });

    
    // __.app.use(__.router);
    // catch 404 and forward to error handler
    __.app.use(function (req, res, next) {
        var err = new Error('Page Not Found');
        err.status = 404;
        next(err);
    });
    // production error handler
    __.app.use(function (err, req, res, next) {
        if (err) {
            console.log(JSON.stringify(err));
            res.status(err.status || 500);
            res.render('404', {
                title: 'Page not found'
            });
        }
    });
})();
