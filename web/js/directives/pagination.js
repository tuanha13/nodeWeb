(function (angular) {
    'use strict';

    angular.module('app.directives').directive('pagination', Pagination);

    function Pagination() {
        var directive = {};

        directive.restrict = 'EA';
        directive.scope = {
            totalItems: '='
        };
        directive.templateUrl = view('partials/pagination.html');
        directive.controller = function ($scope) {
            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;

            function calculatePages() {
                $scope.numPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
                $scope.pages = [];

                var n = 5; // the number pages will be show at the middle
                var end = 5, start = 1;

                if ($scope.numPages < n) {
                    end = $scope.numPages;
                } else {
                    if ($scope.currentPage > 3) {
                        start = Math.min($scope.currentPage - 2, Math.min($scope.currentPage + 2, $scope.numPages) - n);
                        end = Math.min($scope.numPages, ($scope.currentPage + 2));

                        if ((end - start) >= 5) {
                            start = end - 4;
                        }
                    }
                }

                for (var i = start; i <= end; i++) {
                    $scope.pages.push(i);
                }
            }

            $scope.$watch(function () { return $scope.itemsPerPage; }, calculatePages);
            $scope.$watch(function () { return $scope.currentPage; }, calculatePages);

            // on select page
            $scope.page = function (pg) {
                $scope.currentPage = pg;
            };
            // on select first page
            $scope.first = function () {
                $scope.currentPage = 1;
            };
            // on select prev page
            $scope.prev = function () {
                if ($scope.currentPage == 1) {
                    return;
                }

                $scope.currentPage--;
            };
            // on select next page
            $scope.next = function () {
                if ($scope.currentPage == $scope.numPages) {
                    return;
                }

                $scope.currentPage++;
            }
            // on select last page
            $scope.last = function () {
                $scope.currentPage = $scope.numPages;
            };
        };

        return directive;
    }
})(window.angular);