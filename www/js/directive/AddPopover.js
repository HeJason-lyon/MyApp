angular.module("myApp")
    .directive('addBtnPopover', function (App) {
        return {
            restrict: 'AE',
            template: '<button class="button button-icon button-clear ion-android-more-vertical btn-padding"></button>',
            scope: true,
            link: function ($scope, iElm, iAttrs, controller) {
                App.ionPopover.fromTemplateUrl('templates-directive/add-popover.html', {
                    scope: $scope
                }).then(function (popover) {
                    $scope.popover = popover;
                    iElm.on('tap', function ($event) {
                        $scope.popover.show($event);
                    })
                });
                $scope.hidePopover = function () {
                    $scope.popover.hide();
                }
                $scope.$on('$destroy', function () {
                    $scope.popover.remove();
                });
            }
        }
    })