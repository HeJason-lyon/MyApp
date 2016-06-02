angular.module('myApp')
    .controller('memoCtrl', function ($scope, $stateParams, App) {
        var ms = this;
        ms.memoData = [{
            icon: "adam.jpg",
            time: '2016-4-27 19:08:39',
            content: "<div class='img-holder'><img src='img/icon_4.jpg'></img><img src='img/icon_5.jpg'></img><img src='img/icon_6.jpg'></img><img src='img/icon_7.jpg'></img></div>今天感觉自己萌萌哒?~~~"
        }, {
                icon: "ben.png",
                time: '2016-4-26 19:08:39',
                content: "<div class='img-holder'><img src='img/icon_1.jpg'></img><img src='img/icon_2.jpg'></img><img src='img/icon_3.jpg'></img><img src='img/icon_4.jpg'></img></div>今天感觉自己萌萌哒?~~~"
            }, {
                icon: "max.png",
                time: '2016-4-25 19:08:39',
                content: "<div class='img-holder'><img src='img/icon_2.jpg'></img><img src='img/icon_2.jpg'></img><img src='img/icon_6.jpg'></img><img src='img/icon_4.jpg'></img></div>今天感觉自己萌萌哒?~~~"
            }, {
                icon: "adam.jpg",
                time: '2016-4-24 19:08:39',
                content: "<div class='img-holder'><img src='img/icon_1.jpg'></img><img src='img/icon_7.jpg'></img><img src='img/icon_5.jpg'></img><img src='img/icon_4.jpg'></img></div>今天感觉自己萌萌哒?~~~"
            },]
    })