(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('AdminIndexController', AdminIndexController);

    AdminIndexController.$inject = ['AppServices'];

    function AdminIndexController(AppServices) {
        AppServices.location().url('');
    }
})(window.angular);