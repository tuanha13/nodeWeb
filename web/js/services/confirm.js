(function (angular) {
    'use strict';

    angular.module('app.services').service('ConfirmService', ModalService);

    ModalService.$inject = ['ModalService'];
    function ModalService(ModalService) {
        var defaults = {
            backdrop: 'static',
            keyboard: true,
            modalFade: true,
            size: 'md',
            templateUrl: view('partials/confirm.html')
        };

        var options = {
            closeButtonText: 'No',
            actionButtonText: 'Yes',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.open = function (customOptions) {
            var tempModalDefaults = {};

            angular.extend(tempModalDefaults, defaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(options, customOptions);
            tempModalDefaults.controller = function ($scope, $uibModalInstance) {
                $scope.options = options;
                $scope.options.yes = function (result) {
                    $uibModalInstance.close(result);
                };
                $scope.options.no = function (result) {
                    $uibModalInstance.dismiss(null);
                };
            }

            return ModalService.open(tempModalDefaults);
        };
    }
})(window.angular);