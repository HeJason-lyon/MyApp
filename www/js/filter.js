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
    .filter('getLoadFiles',function(App) {
        return function (array) {
            var result = [];
            for(var i=0;i<array.length;i++){
                var matchCtrl = array[i].match(/\.c$/i),
                matchDirective = array[i].match(/\.d$/i),
                matchService = array[i].match(/\.s$/i);
                if(matchCtrl){
                    result.push(App.CTRLURL + array[i].split(/\.c$/i)[0])
                }else if(matchDirective){
                    result.push(App.DIRECTIVEURL + array[i].split(/\.d$/i)[0])
                }else if(matchService){
                    result.push(App.SERVICEURL + array[i].split(/\.s$/i)[0])
                }else{
                    throw("没有匹配到对的文件");
                }
            }
            return result;
        }
    })