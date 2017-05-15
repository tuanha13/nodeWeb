(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['AppServices', 'config'];
    function DashboardController(AppServices, config) {
        var that = this;

        that.model = {
            users: []
        };
        that.currentPage = 1;
        that.itemsPerPage = config.itemsPerPage;


        // open dialog to add new user
        that.add = function () {
            var options = {};
            options.templateUrl = view('dashboard/views/add.html');
            options.controller = function ($scope, $uibModalInstance) {
                $scope.options = {};

                $scope.options.add = function () {
                    // do add
                    $uibModalInstance.close(true);
                };

                $scope.options.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            AppServices.modal().open(options).then(function (result) {
            });
        };

        that.edit = function () {
            var options = {};
            options.templateUrl = view('dashboard/views/edit.html');
            options.controller = function ($scope, $uibModalInstance) {
                $scope.options = {};

                $scope.options.update = function () {
                    // do add
                    $uibModalInstance.close(true);
                };

                $scope.options.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            AppServices.modal().open(options).then(function (result) {
            });
        };

        that.delete = function (id) {
            var options = {
                headerText: 'Delete user?',
                bodyText: 'Are you sure you want to delete this user?'
            };

            AppServices.confirm().open(options).then(function (result) {
                console.log(result);
            });
        };
    }
})(window.angular);