angular.module("myApp.directive", [])
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
    .directive('nameLetterList', function (App) {
        return {
            restrict: 'AE',
            templateUrl: "templates-directive/letter-list.html",
            scope: true,
            link: function ($scope, iElm, iAttrs, controller) {
                var ms = $scope.ms = {};
                var alphabet = [];
                var liHeight = {};
                var iterateAlphabet = function () {
                    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    var numbers = new Array();
                    for (var i = 0; i < str.length; i++) {
                        var nextChar = str.charAt(i);
                        numbers.push(nextChar);
                    }
                    ms.alphabet = numbers;
                }
                var makeHeight = function () {
                    var windowHeight = App.window.innerHeight;
                    var contentHeight = windowHeight - 117
                    var scrollHeight = parseInt(contentHeight / 27);
                    ms.liHeight = { "height": scrollHeight + "px" };
                }

                ms.showWord = false;
                ms.nowWord = "";
                ms.goItem = function (id) {
                    App.location.hash(id);
                    ms.nowWord = id;
                    ms.showWord = true;
                    App.ionScrollDel.anchorScroll();
                    App.timeout(function () {
                        ms.showWord = false;
                    }, 500);
                }
                ms.show = function(id){
                    ms.id = id;
                }
                iterateAlphabet();
                makeHeight();              
            }
        }
    })
    .directive('timeLineHolder', function () {
        return {
            restrict: 'AE',
            template: "<ul class='time-line' ng-transclude></ul>",
            transclude: true,
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {

            }
        }
    })
    .directive('timeLineItem', function () {
        return {
            restrict: 'AE',
            template: "<li>" +
            '<div class="row">' +
            '<div class="time-left">' +
            '<h6>{{time}}</h6>' +
            '</div>' +
            '<div class="col">' +
            '<div class="time-right">' +
            '<div ng-bind-html="content">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</li>',
            scope: {
                time: '@',
                content: '@',
            },
            transclude: true,
            replace: true,
            link: function ($scope, iElm, iAttrs, controller) {
            }
        }
    })
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
                    alert(1);
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
                scope.$on('PonitChange', function () {
                    baiduMap.map.openInfoWindow(infoWindow, baiduMap.nowMarker.getPosition());
                })
            }
        }
    })
