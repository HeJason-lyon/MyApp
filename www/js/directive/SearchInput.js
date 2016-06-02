angular.module("myApp")
    .directive('searchInput', function (App) {
        return {
            restrict: 'AE',
            link: function ($scope, iElm, iAttrs, controller) {
                App.ionModal.fromTemplateUrl('templates-directive/search-modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    hardwareBackButtonClose: false,
                }).then(function (modal) {
                    $scope.modal = modal;
                    iElm.on('click', function () {
                        $scope.modal.show();
                        $scope.$emit("modalIsShow", modal);
                    })
                });

                $scope.$on('$destroy', function () {
                    $scope.modal.remove();
                });
            }
        }
    })