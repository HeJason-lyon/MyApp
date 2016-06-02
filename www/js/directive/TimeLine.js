angular.module("myApp")   
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