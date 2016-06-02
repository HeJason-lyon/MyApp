angular.module("myApp")
    .directive('modalSearchInput', function () {
        return {
            restrict: 'AE',
            templateUrl: "templates-directive/modal-search-input.html",
            link: function ($scope, iElm, iAttrs, controller) {
                var searchInput = jqLite(iElm[0]).find('input')[0];

                $scope.hideModal = function () {
                    $scope.modal.hide();
                }
                $scope.clearSearchWord = function () {
                    searchInput.focus()
                    $scope.ms.searchWord = "";
                    $scope.ms.searchPlayLists = [];
                }
            }
        }
    })
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