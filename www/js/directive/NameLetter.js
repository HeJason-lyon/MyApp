angular.module("myApp")   
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