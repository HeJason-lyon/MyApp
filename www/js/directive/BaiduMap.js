angular.module("myApp")   
    .directive('baiduMap', function (App) {
        return {
            restrict: 'AE',
            template: '<div>' +
            '<div></div>' +
            '<div ng-transclude></div>' +
            '</div>',
            scope: {
                latitude: "=",
                longitude: "=",
                address: '=',
                zoom: '='
            },
            controller: function ($scope, $element, $attrs, $transclude) {
                this.mapEle = jqLite($element[0]).find('div')[0];
                this.map = new BMap.Map(this.mapEle);
                this.point = new BMap.Point($scope.longitude, $scope.latitude);
                this.nowMarker = new BMap.Marker(this.point);
                this.changePonit = function (longitude, latitude) {
                    this.point = new BMap.Point(longitude, latitude)
                    this.nowMarker = new BMap.Marker(this.point);
                    $scope.$broadcast('PonitChange');
                }
            },
            transclude: true,
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var windowHeight = App.window.innerHeight;
                var docHeight = windowHeight - 43 - 60;
                var myGeo = new BMap.Geocoder();
                var isFirst = true;
                jqLite(controller.mapEle).css('height', docHeight + "px");
                var getAddress = function () {
                    myGeo.getLocation(controller.point, function (result) {
                        if (result) {
                            $scope.$apply(function () {
                                $scope.address = result.address;
                            });
                        }
                    });
                }
                var initPostition = function () {
                    controller.map.centerAndZoom(controller.point, $scope.zoom)
                    getAddress();
                }
                var panPostition = function () {
                    controller.map.panTo(controller.point)
                    getAddress();
                }
                $scope.$watch('latitude+longitude', function () {
                    if (isFirst) {
                        initPostition();
                    } else {
                        controller.changePonit($scope.latitude, $scope.longitude);
                        panPostition();
                    }
                    isFirst = false;
                })
            }
        }
    })
    .directive('bdZoomControl', function () {
        return {
            restrict: 'AE',
            require: '^baiduMap',
            replace: true,
            link: function (scope, iElm, iAttrs, baiduMap) {
                var zoomControl = new BMap.ZoomControl();
                baiduMap.map.addControl(zoomControl);//添加缩放控件                  
            }
        }
    })
    .directive('bdScaleControl', function () {
        return {
            restrict: 'AE',
            require: '^baiduMap',
            replace: true,
            link: function (scope, iElm, iAttrs, baiduMap) {
                var scaleControl = new BMap.ScaleControl();
                baiduMap.map.addControl(scaleControl);//添加比例尺控件  
            }
        }
    })
    .directive('bdMarker', function () {
        return {
            restrict: 'AE',
            require: '^baiduMap',
            replace: true,
            link: function (scope, iElm, iAttrs, baiduMap) {
                baiduMap.map.addOverlay(baiduMap.nowMarker);
                scope.$on('PonitChange', function () {
                    baiduMap.map.addOverlay(baiduMap.nowMarker);
                })
            }
        }
    })
    .directive('bdWindow', function () {
        return {
            restrict: 'AE',
            require: '^baiduMap',
            replace: true,
            link: function (scope, iElm, iAttrs, baiduMap) {
                var opts = scope.$eval(iAttrs.infoOptions);
                var content = iAttrs.infoContent;
                content = content ? content : "<h5 class='light text-center'>您当前的位置</h5>";
                var infoWindow = new BMap.InfoWindow(content, opts);
                baiduMap.map.openInfoWindow(infoWindow, baiduMap.nowMarker.getPosition());
                scope.$on('PonitChange', function () {
                    baiduMap.map.openInfoWindow(infoWindow, baiduMap.nowMarker.getPosition());
                })
            }
        }
    })
