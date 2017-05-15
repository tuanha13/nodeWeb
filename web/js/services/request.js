(function (angular) {
    'use strict';

    angular.module('app.services').service('Request', Request);

    Request.$inject = ['$q', '$http'];
    function Request($q, $http) {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        function loading(action) {
            switch (action) {
                case 'show':
                    break;
                case 'hide':
                    break;
            }
        }

        function getFn(url, params, options) {
            return requestFn(url, params, 'GET', options);
        }

        function postFn(url, params, options) {
            return requestFn(url, params, 'POST', options);
        }

        function putFn(url, params, options) {
            return requestFn(url, params, 'PUT', options);
        }

        function deleteFn(url, params, options) {
            return requestFn(url, params, 'DELETE', options);
        }

        function requestFn(url, data, method, options) {
            var d = $q.defer();
            data = data || {};
            options = options || {};

            angular.extend(config, options);

            config.url = url;
            config.method = method = method || 'GET';

            if (!/(GET|POST|PUT|DELETE)/gi.test(method)) {
                method = 'GET';
            }

            switch (config.method) {
                case 'POST':
                case 'PUT':
                    config.data = data;
                    break;
                case 'GET':
                    config.params = data;
                    break;
                default:
                    break;
            }

            loading('show');
            $http(config).then(successCb, errorCb);

            function successCb(response) {
                loading('hide');

                switch (response.status) {
                    case 200:
                        d.resolve(response.data);
                        break;
                    case 401:
                    case 400:
                    case 304:
                    case 500:
                        console.error(response.data.message);
                        break;
                }
            }

            function errorCb(err) {
                console.error(err);
                d.reject(err);
            }

            return d.promise;
        }

        return {
            'get': getFn,
            'post': postFn,
            'put': putFn,
            'delete': deleteFn,
            'request': requestFn
        };
    }
})(window.angular);
