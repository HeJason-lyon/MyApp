angular.module("myApp")
    .directive('orderList', function () {
        return {
            controller: function ($scope, $element, $attrs, $transclude) {
                var lists = [];
                this.getOpened = function (selectedItem) {
                    angular.forEach(lists, function (item, key) {
                        if (selectedItem != item) {
                            item.showMe = false;
                        }
                    });
                }
                this.addItem = function (item) {
                    lists.push(item);
                }
            },
            restrict: 'AE',
            template: '<ul class="list" ng-transclude></ul>',
            replace: true,
            transclude: true,
            link: function ($scope, iElm, iAttrs, controller) { }
        };
    })
    .directive('orderListItem', function () {
        return {
            scope: {
                orderVaule: '=',
                orderReverse: '=',
                orderPredicate: '=',
                iconUp: '@',
                iconDown: '@',
            },
            controller: function ($scope, $element, $attrs, $transclude) { },
            require: '?^orderList',
            restrict: 'AE',
            template: '<li class="item item-icon-right" ng-click="toogle(orderVaule)">' +
            '<span ng-transclude></span>' +
            '<i ng-show="showMe" ng-class="{true:\'{{iconUp}}\',false:\'{{iconDown}}\'}[orderReverse]"></i>' +
            '</li>',
            transclude: true,
            link: function ($scope, iElm, iAttrs, controller) {
                $scope.showMe = false;
                controller.addItem($scope);
                $scope.toogle = function (value) {
                    $scope.orderReverse = !$scope.orderReverse;
                    $scope.orderPredicate = value;
                    $scope.showMe = true;
                    controller.getOpened($scope);
                }
            }
        };
    })