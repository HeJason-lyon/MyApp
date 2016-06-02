angular.module('myApp')
    .run(function (App, $ionicPlatform, $rootScope, $timeout, $ionicHistory, $q, $window, $ionicModal, $ionicPopover, $state, $stateParams,IsHideTabs,$ionicScrollDelegate,$location,$ionicPopup,$filter,$localStorage,$document) {
        
        //angular工具
        jqLite = angular.element;
        each = angular.forEach;
        isEquals = angular.equals;
        extend = angular.extend;
        isArray = angular.isArray;
        isEle = angular.isElement;
        isFn = angular.isFunction;
        isNum = angular.isNumber;
        isObj = angular.isObject;
        isStr = angular.isString;
        isUndefined = angular.isUndefined;

        //平常使用
        App.q = $q;
        App.window = $window;
        App.document = $document;
        App.timeout = $timeout;
        App.state = $state;
        App.stateParams = $stateParams; 
        App.location = $location;
        App.filter = $filter;
        App.localStorage = $localStorage
            
        //ionic系列
        App.ionPopover = $ionicPopover;
        App.ionModal = $ionicModal;
        App.ionScrollDel = $ionicScrollDelegate;
        App.ionHistory = $ionicHistory;
        App.ionPopup = $ionicPopup;
        
        //全局对象
        global = $rootScope.global = {
            isLogin: false,
        }
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
            $rootScope.isHideTabs = IsHideTabs.indexOf(toState.name) >= 0 ? true : false;
        });
        
    })