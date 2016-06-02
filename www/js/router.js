angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, App) {
    var loadFiles = [];
    var resultLoadFiles = [];

    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");
    $ionicConfigProvider.navBar.alignTitle('center');
    
    $stateProvider
      .state('introduce', {
        url: '/introduce',
        templateUrl: 'templates/introduce.html',
        controller: 'IntroudeCtrl as ms',
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['Introduction.js.c']
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl as ms',
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['App.js.c'];
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      .state('app.map', {
        url: '/map',
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapCtrl as ms'
          }
        },
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['Map.js.c', "BaiduMap.js.d"];
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })

      .state('app.memo', {
        url: '/memo',
        views: {
          'menuContent': {
            templateUrl: 'templates/memo.html',
            controller: 'memoCtrl as ms'
          }
        },
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['Memo.js.c', "TimeLine.js.d"];
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })

      .state('app.tabs', {
        url: '/tabs',
        abstract: true,
        views: {
          'menuContent': {
            templateUrl: 'templates/tabs-index.html',
          }
        }
      })

      .state('app.tabs.playlists', {
        url: '/playlists',
        views: {
          'indexView': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl as ms'
          }
        },
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['Playlists.js.c', 'ModalSearchInput.js.d', 'AddPopover.js.d','Playlists.js.s']
            resultLoadFiles = $filter('getLoadFiles')(loadFiles);
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })

      .state('app.tabs.addData', {
        url: '/addData',
        views: {
          'indexView': {
            templateUrl: 'templates/add-data.html',
            controller: 'EditDataCtrl as ms'
          }
        },
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['EditData.js.c','Playlists.js.s'];
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })

      .state('app.tabs.playlistSingle', {
        url: '/playlistSingle/:playlistId',
        views: {
          'indexView': {
            templateUrl: 'templates/add-data.html',
            controller: 'EditDataCtrl as ms'
          }
        },
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['EditData.js.c',"Playlists.js.s"];
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })

      .state('app.tabs.contacts', {
        url: '/contacts',
        views: {
          'contactView': {
            templateUrl: 'templates/contacts.html',
            controller: 'ContactsCtrl as ms',
            resolve: {
              appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
                loadFiles = ['Contacts.js.c'];
                resultLoadFiles = $filter('getLoadFiles')(loadFiles)
                return $ocLazyLoad.load(resultLoadFiles);
              }]
            }
          }
        }
      })

      .state('app.tabs.contactSingle', {
        url: '/contactSingle/:contactsId',
        views: {
          'contactView': {
            templateUrl: 'templates/contact-single.html',
            controller: 'ContactSingleCtrl as ms'
          }
        }
      })

      .state('app.tabs.about', {
        url: '/about',
        views: {
          'aboutView': {
            templateUrl: 'templates/about.html',
            controller: 'AboutCtrl as ms'
          }
        },
        resolve: {
          appLoad: ['$ocLazyLoad', '$filter', function ($ocLazyLoad, $filter) {
            loadFiles = ['About.js.c'];
            resultLoadFiles = $filter('getLoadFiles')(loadFiles)
            return $ocLazyLoad.load(resultLoadFiles);
          }]
        }
      })
    $urlRouterProvider.otherwise('/introduce');
  });