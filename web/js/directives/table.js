(function (angular, $) {
    'use strict';

    angular.module('app.directives').directive('wtable', WTableDirective);

    WTableDirective.$inject = ['AppServices'];
    function WTableDirective(AppServices) {
        var directive = {};

        directive.restrict = 'A';
        directive.link = function (scope, element, attrs) {};

        return directive;
    }

    angular.module('app.directives').directive('wtableRow', WTableRowDirective);

    WTableRowDirective.$inject = ['AppServices'];
    function WTableRowDirective(AppServices) {
        var directive = {};

        directive.restrict = 'A';
        directive.link = function (scope, element, attrs) {
            $(element).on('click', function (e) {
                if (e.target.nodeName.toLowerCase() == 'td') {
                    $(element).parents('table').find('tbody tr').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        };

        return directive;
    }

    angular.module('app.directives').directive('dtable', DTableDirective);

    DTableDirective.$inject = [];
    function DTableDirective() {
        var directive = {};

        directive.restrict = 'A';
        directive.link = function (scope, ele, atts) {
            scope.$watch(function () {
                return $(ele).height();
            }, function () {
                $(ele).trigger('dtable:heightChanged');
            });
        };

        return directive;
    }

    angular.module('app.directives').directive('dtableCol', DTableColDirective);

    DTableColDirective.$inject = [];
    function DTableColDirective() {
        var directive = {};

        directive.restrict = 'A';
        directive.link = function (scope, ele, atts) {
            $(ele).css('min-height', getHeight(ele));

            $(ele).parents('[dtable]').on('dtable:heightChanged', function () {
                $(ele).css('min-height', getHeight(ele));
            });
        };

        function getHeight(ele) {
            var max = 0;

            $(ele).parents('[dtable]').find('[dtable-col] table').each(function () {
                max = Math.max(max, $(this).height());
            });

            return max < 500 ? 500 : max;
        }

        return directive;
    }

})(window.angular, window.jQuery);
