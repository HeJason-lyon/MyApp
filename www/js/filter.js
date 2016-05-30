angular.module('myApp.filter', [])
    .filter('searchWord', function () {
        return function (input, searchList, searchWord) {
            var tmp = [];
            angular.forEach(searchList, function (value, key) {
                if (searchWord != "" && value.title.match(searchWord)) {
                    tmp.push(value);
                }
            })
            return tmp;
        }
    })
    .filter('getDetailData', function () {
        return function (input, id) {            
            return input[id];
        }
    })