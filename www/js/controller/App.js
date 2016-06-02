angular.module('myApp')
    .controller('AppCtrl', function ($scope, App) {
        var ms = this;
        ms.userInfo = {
            userName: '第三方',
            userDesign: '长夜漫漫，我愿守望',
            userIcon: 'img/icon_2.jpg'
        }
    })