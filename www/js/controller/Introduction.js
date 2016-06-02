angular.module('myApp')
    .controller('IntroudeCtrl', function ($scope, App, $cordovaSplashscreen) {
        var ms = this;
        App.ionHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        ms.isFirstUse = App.localStorage.isFirstUse;
        ms.goIndex = function () {
            App.localStorage.isFirstUse = true;
            App.state.go('app.tabs.playlists');
        }
        $scope.$on("$ionicView.enter", function (event, data) {
            if (App.localStorage.isFirstUse) {
                App.state.go('app.tabs.playlists');
            }
        });
    })