angular.module('myApp')
    .controller('AboutCtrl', ['App', 'MyPopupFactory', '$scope', function (App, MyPopupFactory, $scope) {
        var ms = this;
        var isShow = true;

        ms.checkData = function () {
            MyPopupFactory.showPopup({
                scope: $scope,
                template: '<input type="password" ng-model="ms.wifi">'
            }, true);
        }
    }])