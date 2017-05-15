(function (angular) {
    'use strict';

    angular.module('app.directives').directive('select', Select);

    function Select() {
        var directive = {};

        directive.restrict = 'E';
        directive.link = function (scope, element, attr) {
            $(element).selectpicker();
        };

        return directive;
    }
})(window.angular);