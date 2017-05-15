(function (angular) {
    'use strict';

    angular.module('app.services').service('ModalService', ModalService);

    ModalService.$inject = ['$uibModal'];
    function ModalService($uibModal) {
        var defaults = {
            backdrop: 'static',
            keyboard: true,
            modalFade: false,
            size: 'md',
            templateUrl: view('partials/modal.html')
        };

        this.open = function (customModalDefaults) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, defaults, customModalDefaults);

            return $uibModal.open(tempModalDefaults).result;
        };
    }
})(window.angular);