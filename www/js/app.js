// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('myApp', ['ionic', 'myApp.controllers', 'myApp.service', 'myApp.directive', 'ngCordova', 'myApp.filter', 'ngStorage'])
  .run(function (App, $ionicPlatform, $cordovaKeyboard, $rootScope, $cordovaToast, IsHideTabs, $cordovaSplashscreen) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      var backBtnInfo = {
        keyboardIsHide: true,
        myModal: "",
      }

      var keyboardShowHandler = function (e) {
        backBtnInfo.keyboardIsHide = false;
      }

      var keyboardHideHandler = function (e) {
        setTimeout(function () {
          backBtnInfo.keyboardIsHide = true;
        }, 100);
      }

      window.addEventListener('native.keyboardhide', keyboardHideHandler);
      window.addEventListener('native.keyboardshow', keyboardShowHandler);

      $ionicPlatform.registerBackButtonAction(function (event) {
        if (backBtnInfo.keyboardIsHide) {
          if (App.ionHistory.backView()) {
            App.ionHistory.goBack();
          } else {
            if ($rootScope.isExitApp) {
              ionic.Platform.exitApp();
            } else {
              $rootScope.isExitApp = true;
              $cordovaToast.showShortBottom('再按一次退出系统');
              setTimeout(function () {
                $rootScope.isExitApp = false;
              }, 2000);
            }
          }
        }
        e.preventDefault();
        return false;
      }, 101);

      $ionicPlatform.onHardwareBackButton(function (event) {
        if (backBtnInfo.keyboardIsHide && isObj(backBtnInfo.myModal)) {
          backBtnInfo.myModal.hide();
        }
      })

      $rootScope.$on('modalIsShow', function (data, modal) {
        backBtnInfo.myModal = modal;
      });
    });

  })
