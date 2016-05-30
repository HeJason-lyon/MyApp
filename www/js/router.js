angular.module('myApp')
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, App) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");
    $ionicConfigProvider.navBar.alignTitle('center')
    $stateProvider
      .state('introduce', {
        url: '/introduce',
        templateUrl: 'templates/introduce.html',
        controller: 'IntroudeCtrl as ms',
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl as ms'
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
        }
      })

      .state('app.mmo', {
        url: '/memo',
        views: {
          'menuContent': {
            templateUrl: 'templates/memo.html',
            controller: 'memoCtrl as ms'
          }
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
        }
      })
      .state('app.tabs.addData', {
        url: '/addData',
        views: {
          'indexView': {
            templateUrl: 'templates/add-data.html',
            controller: 'EditDataCtrl as ms'
          }
        }
      })
      .state('app.tabs.playlistSingle', {
        url: '/playlistSingle/:playlistId',
        views: {
          'indexView': {
            templateUrl: 'templates/add-data.html',
            controller: 'EditDataCtrl as ms'
          }
        }
      })

      .state('app.tabs.contacts', {
        url: '/contacts',
        views: {
          'contactView': {
            templateUrl: 'templates/contacts.html',
            controller: 'ContactsCtrl as ms',
            resolve: {
              MyTest: function () {
                var result = [];
                var startTime = new Date().getTime();
                for (var i = 0; i < 1000; i++) {
                  result.push({ id: i, name: "test" + i });
                }
                var endTime = new Date().getTime();
                console.log(endTime-startTime);
                return result;
              }
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
        }
      })
    $urlRouterProvider.otherwise('/introduce');
  });