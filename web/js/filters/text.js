(function (angular) {
    'use strict';

    var filter = angular.module('app.filters');

    filter.filter('textLimit', function () {
        return function (text, limit) {
            if (!text) {
                return '';
            }

            if (text.length <= limit) {
                return text;
            }

            return text.substr(0, limit) + '...';
        }
    });
})(window.angular);
