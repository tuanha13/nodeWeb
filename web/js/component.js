(function(angular) {
  'use strict';
  var components = [
    {
      name: 'Panel',
      options: ['className', 'title', 'id']
    },
    {
      name: 'Form',
      options: ['className', 'id']
    },
    {
      name: 'FormGroup',
      options: ['className', 'id']
    },
    {
        name: 'FormH',
        options: ['id']
    },
    {
      name: 'Label',
      options: ['className', 'title', 'id']
    }, 
    {
      name: 'Glyp',
      options: ['className', 'id', 'title']
    },
    {
        name: 'Checkbox',
        options: ['text', 'id']
    }
  
    //{
    //  name: 'Dropdown',
    //  options: ['className', 'id']
    //},
    //{
    //  name: 'Input',
    //  options: ['className', 'type', 'title', 'id']
    //}
  ];
  if (angular.isObject(wberApp)) {
      angular.forEach(components, function (val, idx) {
          wberApp.directive('wber' + val.name, function ($compile) {
              var attr = {};
              $.each(val.options, function (i, v) {
                  attr[v] = '@'
              });
              return {
                  replace: true,
                  transclude: true,
                  scope: attr,
                  controller: function ($scope) {
                      $scope.apply(this, agrument);
                  },
                  link: function (scope, elem, attrs, ctrls, transclude) {
                     //$compile(elem)(scope);

                      /* Attaching Custom Data on Transclusion Scopes
                      transclude(function(transEl, transScope) {
                        transScope.item = scope.item;
                        elem.append(transEl);
                      });
                      */
                  },
                  templateUrl: '/Widgets/Components/_'+ val.name.toLowerCase() +'.html'
              };
          });
      });

      angular.module('wber.directive', ["wber.directive.dropdowncat"]);
      angular.module('wber.directive.dropdowncat', [])
      .controller('wbUiDropdownCatController', ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {
          this.catName = null;
          this.setName = function (obj) {
              $scope.wberDataModel = obj;
          };
      }])
      .directive('wbUiDropdownCat', function () {
          /*
          @: get string
          =: get object
          &: function
          */
          return {
              replace: true,
              scope: {
                  wberDataList: '=',
                  wberDataModel: '=',
                  wberDataLabel: '@'
              },
              controller: 'wbUiDropdownCatController',
              controllerAs: 'ctrl',
              link: function (scope, element, attrs, dropdownCtrl) {
                  // console.debug('dropdownCtrl>>>>', scope.ctr);
                  console.debug(scope);
              },
              templateUrl: '/Widgets/Components/_dropdown_cat.html'
          }
      });
  }  
})(window.angular);

/**/
