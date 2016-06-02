angular.module('myApp.service', [])
    .constant('IsHideTabs', ['app.tabs.playlistSingle', 'app.tabs.addData'])
    .constant('App', {
        version: '1.0.0',
        CTRLURL : 'js/controller/',
        SERVICEURL : 'js/service/',
        DIRECTIVEURL : 'js/directive/',
    })    
    .factory('MyPopupFactory', function (App) {
        var alertOptions = {
            // title: '提示',
            template: "",
            cssClass: 'defalut-popup',
            buttons: [{
                text: '确认',
                type: 'button-positive'
            }]
        }
        return {
            //方便使用的Popup服务
            showPopup: function (options, isBack,callback) {
                //将ontap放入参数内
                alertOptions.buttons[0].onTap = callback;
                //合并参数，如果对象中有ontap方法，则上面的声明无效
                extend(alertOptions, options);
                App.ionPopup.show(alertOptions).then(function () {
                    //是否点击之后立刻返回
                    if (App.ionHistory.backView() && isBack) {
                        App.ionHistory.goBack();
                    }
                })
            }
        };
    })