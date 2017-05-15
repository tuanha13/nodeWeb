(function (angular) {
    'use strict';

    angular.module('app.services').service('Storage', Storage);

    function Storage() {
        return {
            set: function (name, value) {
                if (angular.isObject(name)) {
                    angular.forEach(name, function (val, key) {
                        sessionStorage.setItem(key, val);
                    });
                } else {
                    sessionStorage.setItem(name, value);
                }
            },
            get: function (name) {
                return sessionStorage.getItem(name);
            },
            clear: function (name) {
                sessionStorage.removeItem(name);
            },
            clearAll: function () {
                sessionStorage.clear();
            }
        };
    }
})(window.angular);
