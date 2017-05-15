(function (angular, win) {
    'use strict';

    function route(route, options) {
        options.controllerAs = '$ctrl';
        if (_.has(options, 'templateUrl')) {
            options.templateUrl = view(options.templateUrl);
        }

        win.routes[route] = options;
    }

    win.routes = {};

    // home index
    route('/', {
        templateUrl: 'admin/views/index.html',
        controller: 'AdminIndexController'
    });

     route('/dashboard', {
        templateUrl: 'dashboard/views/index.html',
        controller: 'DashboardController'
    });

})(window.angular, window);
