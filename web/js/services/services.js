(function (angular) {
    'use strict';

    angular.module('app.services').service('AppServices', AppServices);

    AppServices.$inject = [
        'Request',
        'Storage',
        'ConfirmService',
        'ModalService',
        '$location',
        '$cookies'
    ];
    function AppServices(Request, Storage, ConfirmService, ModalService, $location, $cookies) {
        return {
            request: function () {
                return Request;
            },
            storage: function () {
                return Storage;
            },
            confirm: function () {
                return ConfirmService;
            },
            modal: function () {
                return ModalService;
            },
            location: function () {
                return $location;
            },
            cookies: function () {
                return $cookies;
            }
        }
    }

})(window.angular);
