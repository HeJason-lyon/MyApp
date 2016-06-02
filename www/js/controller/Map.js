angular.module('myApp')
    .controller('MapCtrl', function ($cordovaGeolocation,MyPopupFactory) {
        console.log(1);
        var ms = this;
        var watchId;
        var options = {
            enableHighAccuracy: true,  // 是否使用 GPS
            // maximumAge: 30000,         // 缓存时间
            timeout: 3000,            // 超时时间
            coorType: 'bd09ll'         // 默认是 gcj02，可填 bd09ll 以获取百度经纬度用于访问百度 API
        }
        ms.info = {
            zoom: 16
        }
        ms.isCache = false;
        ms.GetCurrentPosition = function () {
            try {
                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                    ms.info.latitude = position.coords.latitude;
                    ms.info.longitude = position.coords.longitude;
                    ms.info.isGetData = true;
                }, function (err) {
                    var options = {
                        title : "错误！",
                        template : '<h4 class="text-center">请求超时，请检查网络状态</h4>'
                    }
                    MyPopupFactory.showPopup(options);
                });
            } catch (e) {
                alert(e);
            }
        }
        ms.changePosition = function () {
            ms.info.latitude = 116.404;
            ms.info.longitude = 39.915;
        }
        ms.GetCurrentPosition();
    })