(function (angular, $) {
    'use strict';

    angular.module('app.directives').directive('navigation', Navigation);

    Navigation.$inject = ['AppServices'];
    function Navigation(AppServices) {
        var directive = {};

        directive.restrict = 'AE';

        directive.templateUrl = view('partials/navigation.html');

        directive.controller = function () {

        };

        directive.link = function (scope, element, attrs) {
            setSelected();

            scope.$on('$routeChangeStart', setSelected);

            function setSelected() {
                var curRoute = AppServices.location().path();

                $(element).find('li').removeClass('active');

                $(element).find('a').each(function () {
                    var route = $(this).data('route');

                    if (curRoute.indexOf(route) >= 0) {
                        $(this).parent().addClass('active');
                    }
                });
            }
        };

        return directive;
    }

})(window.angular, window.jQuery);
