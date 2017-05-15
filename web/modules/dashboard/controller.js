(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('DashboardController', DashboardController);

    DashboardController.$inject = ['AppServices', 'AppModels', 'config'];
    function DashboardController(AppServices, AppModels, config) {
        var that = this;

        that.model = {
            users: []
        };
        that.currentPage = 1;
        that.itemsPerPage = config.itemsPerPage;

        AppModels.user().getAll().then(function (data) {
            that.model.users = data;
            that.totalItems = 100;
        });

        // open dialog to add new user
        that.add = function () {
            var options = {};
            options.templateUrl = view('user/add.html');
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
            options.templateUrl = view('user/edit.html');
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

        //AppModels.user().getAll().then(function (data) {
        //    that.model.users = data.Users;
        //    that.totalItems = data.TotalUsers;
        //});
    }
})(window.angular);