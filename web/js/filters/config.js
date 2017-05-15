(function (angular) {
    'use strict';

    var filter = angular.module('app.filters');

    filter.filter('siteConfig', ['config', function (config) {
        return function (text) {
            if (!text) {
                return '';
            }

            return config[text] || '';
        }
    }]);
})(window.angular);

