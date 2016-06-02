angular.module('myApp')
    .controller('PlaylistsCtrl', ['App', 'MyPopupFactory', 'PlaylistsData', '$scope', '$cordovaSplashscreen', '$cordovaGeolocation', '$interval', function (App, MyPopupFactory, PlaylistsData, $scope, $cordovaSplashscreen, $cordovaGeolocation, $interval) {
        var ms = this;
        ms.isShow = false;

        ms.searchPlayLists = [];
        ms.searchWord = "";
        ms.isDel = false;
        ms.isOrder = false;
        ms.playlists = [];
        ms.menuItem = [
            {
                id: 1,
                icon: "ion-plus",
                title: "新增",
                onClick: 'ms.goAddData()'
            }, {
                id: 2,
                icon: "ion-trash-b",
                title: "删除",
                onClick: 'ms.showDel()'
            }, {
                id: 3,
                icon: "ion-navicon",
                title: "排序",
                onClick: 'ms.showOrder()'
            }];
        ms.showDel = function () {
            ms.isDel = !ms.isDel;
        }

        ms.showOrder = function () {
            ms.isOrder = !ms.isOrder;
        }

        ms.delData = function ($index) {
            ms.playlists.splice($index, 1);
        }

        ms.orderData = function (item, fromIndex, toIndex) {
            ms.playlists.splice(fromIndex, 1);
            ms.playlists.splice(toIndex, 0, item);
        }

        ms.goAddData = function () {
            setTimeout(function () {
                App.state.go('app.tabs.addData');
            }, 5);
        }

        ms.searchData = function (title) {
            ms.searchPlayLists.push({
                title: title
            })
            if (!title) {
                ms.searchPlayLists = [];
            }
        }
        ms.playlists = PlaylistsData.getData();
    }])