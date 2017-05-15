(function (angular, win) {
    'use strict';

    angular.module('app', [
        'app.controllers',
        'app.models',
        'app.services',
        'app.directives',
        'app.filters',
        'ngRoute',
        'ngCookies',
        'ui.bootstrap'
    ])
    .constant('config', {
        dateFormat: 'yyyy/mm/dd',
        timeFormat: 'HH:mm:ss',
        siteName: 'Location Services',
        itemsPerPage: 14
    })
    .config(function ($routeProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);

        angular.forEach(win.routes, function (opts, route) {
            $routeProvider.when(route, opts);
        });
        // always redirect to home if none match route
        $routeProvider.otherwise({
            redirectTo: '/'
        });

    })
    .run(function ($rootScope, AppServices) {
        $rootScope.$on('$routeChangeStart', function () {

            // add class to body
            var bodyClass = 'page-common';
            var url = AppServices.location().path().match(/[a-z0-9\-\_]+/gi);
            if (url) {
                url = url[0];
                bodyClass = 'page-' + url;
            }

            // remove all class added before
            $('body').removeClass(function (index, className) {
                return (className.match(/(^|\s)page-\S+/g) || []).join(' ');
            }).addClass(bodyClass);
        });
    });

    angular.module('app.controllers', ['ngRoute', 'ui.bootstrap']);

    angular.module('app.models', []);

    angular.module('app.directives', []);

    angular.module('app.filters', []);

    angular.module('app.services', ['ui.bootstrap']);
})(window.angular, window);
