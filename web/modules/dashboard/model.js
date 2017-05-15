(function (angular) {
    'use strict';

    angular.module('app.models').service('UserModel', UserModel);

    UserModel.$inject = ['$q', 'AppServices'];
    function UserModel($q, AppServices) {
        return {
            getAll: function (options) {
                var d = $q.defer();

                // dummy data
                var data = [];
                for (var i = 1; i <= 14; i++) {
                    data.push({
                        id: i,
                        description: 'Description',
                        created: '1900-01-01 00:00:00',
                        modified: '1900-01-01 00:00:00',
                        username: 'username' + i
                    });
                }

                d.resolve(data);

                //AppServices.request().get('/api/v1/users', options).then(function (response) {
                //    d.resolve(response);
                //}, function () {
                //    d.resolve(null);
                //});

                return d.promise;
            },
            get: function (id) {
                var d = $q.defer();

                // dummy data
                d.resolve({
                    id: 1,
                    description: 'Description',
                    created: '1900-01-01 00:00:00',
                    modified: '1900-01-01 00:00:00',
                    username: 'username' + i
                });

                //AppServices.request().get('/api/users/' + id).then(function (response) {
                //    d.resolve(response);
                //}, function () {
                //    d.resolve(null);
                //});

                return d.promise;
            }
        };
    }

})(window.angular);