angular.module('myApp.controllers', [])
    .controller('IntroudeCtrl', function ($scope, App, $cordovaSplashscreen) {
        var ms = this;
        App.ionHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        ms.isFirstUse = App.localStorage.isFirstUse;
        ms.goIndex = function () {
            App.localStorage.isFirstUse = true;
            App.state.go('app.tabs.playlists');
        }
        $scope.$on("$ionicView.enter", function (event, data) {
            if (App.localStorage.isFirstUse) {
                App.state.go('app.tabs.playlists');
            }
        });

    })
    .controller('AppCtrl', function ($scope, App) {
        var ms = this;
        ms.userInfo = {
            userName: '第三方',
            userDesign: '长夜漫漫，我愿守望',
            userIcon: 'img/icon_2.jpg'
        }
    })
    .controller('PlaylistsCtrl', ['App', 'MyPopupFactory', 'PlaylistsData', '$scope', '$cordovaSplashscreen', '$cordovaGeolocation', '$interval', function (App, MyPopupFactory, PlaylistsData, $scope, $cordovaSplashscreen, $cordovaGeolocation, $interval) {
        var ms = this;
        ms.isShow = false;

        ms.searchPlayLists = [];
        ms.searchWord = "";
        ms.isDel = false;
        ms.isOrder = false;
        ms.playlists = [];
        ms.menuItem = [
            {
                id: 1,
                icon: "ion-plus",
                title: "新增",
                onClick: 'ms.goAddData()'
            }, {
                id: 2,
                icon: "ion-trash-b",
                title: "删除",
                onClick: 'ms.showDel()'
            }, {
                id: 3,
                icon: "ion-navicon",
                title: "排序",
                onClick: 'ms.showOrder()'
            }];
        ms.showDel = function () {
            ms.isDel = !ms.isDel;
        }

        ms.showOrder = function () {
            ms.isOrder = !ms.isOrder;
        }

        ms.delData = function ($index) {
            ms.playlists.splice($index, 1);
        }

        ms.orderData = function (item, fromIndex, toIndex) {
            ms.playlists.splice(fromIndex, 1);
            ms.playlists.splice(toIndex, 0, item);
        }

        ms.goAddData = function () {
            setTimeout(function () {
                App.state.go('app.tabs.addData');
            }, 5);
        }

        ms.searchData = function (title) {
            ms.searchPlayLists.push({
                title: title
            })
            if (!title) {
                ms.searchPlayLists = [];
            }
        }
        ms.playlists = PlaylistsData.getData();
    }])
    .controller('MapCtrl', function ($cordovaGeolocation) {
        var ms = this;
        var watchId;
        var options = {
            enableHighAccuracy: true,  // 是否使用 GPS
            maximumAge: 30000,         // 缓存时间
            timeout: 27000,            // 超时时间
            coorType: 'bd09ll'         // 默认是 gcj02，可填 bd09ll 以获取百度经纬度用于访问百度 API
        }
        ms.info = {
            zoom: 16
        }
        ms.GetCurrentPosition = function () {
            try {
                $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                    ms.info.latitude = position.coords.latitude;
                    ms.info.longitude = position.coords.longitude;
                    ms.info.isGetData = true;
                }, function (err) {
                    console.log(err);
                });
            } catch (e) {
                alert(e);
            }
        }
        ms.changePosition = function () {
            ms.info.latitude = 116.404;
            ms.info.longitude = 39.915;
        }
        ms.GetCurrentPosition();
    })
    .controller('ContactsCtrl', function ($scope, $filter, $cordovaContacts, MyTest) {
        var ms = this;
        ms.showWord = false;

        ms.filterData = {
            searchWord: "",
        }
        ms.menuItem = [
            {
                id: 1,
                title: '导入',
                icon: 'ion-archive',
                onClick: 'ms.importContacts()'
            }, {
                id: 2,
                title: '新增',
                icon: 'ion-person-add'
            }]
        ms.liHeight = {}
        ms.contacts = [
            {
                name: "A",
                id: 1,
                $img: "icon_1.jpg"
            }, {
                name: "B",
                id: 2,
                $img: "icon_2.jpg"
            }, {
                name: "C",
                id: 3,
                $img: "icon_3.jpg"
            }, {
                name: "D",
                id: 4,
                $img: "icon_4.jpg"
            }, {
                name: "E",
                id: 5,
                $img: "icon_5.jpg"
            }, {
                name: "F",
                id: 6,
                $img: "icon_6.jpg"
            }, {
                name: "G",
                id: 7,
                $img: "icon_7.jpg"
            }, {
                name: "H",
                id: 8,
                $img: "icon_1.jpg"
            }, {
                name: "I",
                id: 9,
                $img: "icon_2.jpg"
            }, {
                name: "J",
                id: 10,
                $img: "icon_3.jpg"
            }, {
                name: "K",
                id: 11,
                $img: "icon_4.jpg"
            }, {
                name: "R",
                id: 12,
                $img: "icon_5.jpg"
            }, {
                name: "S",
                id: 13,
                $img: "icon_6.jpg"
            }, {
                name: "T",
                id: 14,
                $img: "icon_7.jpg"
            }, {
                name: "U",
                id: 15,
                $img: "icon_1.jpg"
            }, {
                name: "V",
                id: 16,
                $img: "icon_2.jpg"
            }, {
                name: "W",
                id: 17,
                $img: "icon_3.jpg"
            }, {
                name: "X",
                id: 18,
                $img: "icon_4.jpg"
            }, {
                name: "Y",
                id: 19,
                $img: "icon_5.jpg"
            }, {
                name: "Z",
                id: 20,
                $img: "icon_6.jpg"
            }
        ]
        ms.test = MyTest;
        ms.importContactArry = [];
        ms.groupContacts = []

        ms.orderLists = function () {
            ms.contacts = $filter('orderBy')(ms.contacts, 'name');
        }

        ms.importContacts = function () {
            try {
                $cordovaContacts.find('').then(function (allContacts) {
                    if (allContacts) {
                        each(allContacts, function (value, key) {
                            ms.myContact = allContacts;
                            ms.importContactArry.push({ name: value.displayName, $img: value.photos });
                        })
                    }
                })
            } catch (e) {
                alert(e);
            }
        }
        // alert(ms.contacts);
        ms.makeGroup = function () {
            var tmp = {};
            var firstWord;
            for (var i = 0; i < ms.contacts.length; i++) {
                firstWord = ms.contacts[i].name.toUpperCase().charAt(0);
                if (tmp[firstWord] == undefined) {
                    tmp[firstWord] = [];
                }
                tmp[firstWord].push(ms.contacts[i]);
            }
            return tmp;
        }
        ms.loadData = function () {
            ms.orderLists();
            ms.groupContacts = ms.makeGroup();
        }
        ms.loadData();

    })
    .controller('ContactSingleCtrl', function ($scope, $stateParams) {

    })
    .controller('AboutCtrl', ['App', 'MyPopupFactory', '$scope', function (App, MyPopupFactory, $scope) {
        var ms = this;
        var isShow = true;

        ms.checkData = function () {
            MyPopupFactory.showPopup({
                scope: $scope,
                template: '<input type="password" ng-model="ms.wifi">'
            }, true);
        }

    }])
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
    .controller('EditDataCtrl', function ($scope, App, PlaylistsData, MyPopupFactory) {
        var ms = this;
        var nowForm;
        var playlistId = App.stateParams.playlistId;
        var date;
        var changeTimeFormat = function () {
            each(ms.items.info, function (value, key) {
                each(value.child, function (childValue, childKey) {
                    if (childValue.type == "date" || childValue.type == "date-time") {
                        date = new Date(childValue.value);
                        childValue.value = date
                    }
                })
            })
        }
        //通用功能
        App.ionModal.fromTemplateUrl('templates/select-modal.html', {
            scope: $scope,
            animation: 'zoom-animate',
        }).then(function (modal) {
            ms.modal = modal;
        });

        ms.items = {
            "title": "",
            "info": [
                {
                    title: '基本信息',
                    child: [{
                        title: '客户姓名',
                        type: 'text',
                        name: 'customerName',
                        value: '',
                        disabled: false,
                        required: true,
                    }, {
                            title: '性别',
                            type: 'entity',
                            name: 'sex',
                            items: [{
                                text: "男",
                                value: "0"
                            }, {
                                    text: "女",
                                    value: "1"
                                }],
                            value: '',
                            disabled: false,
                            required: true,
                        }, {
                            title: '职业',
                            type: 'entity',
                            name: 'job',
                            items: [{
                                text: "Web前端工程师",
                                value: "0"
                            }, {
                                    text: "Java工程师",
                                    value: "1"
                                }, {
                                    text: "Android工程师",
                                    value: "2"
                                }, {
                                    text: "IOS工程师",
                                    value: "3"
                                }],
                            value: '',
                            disabled: false,
                            required: false,
                        }, {
                            title: '办理时间',
                            name: 'crateTime',
                            type: 'date',
                            value: '',
                            disabled: false,
                            required: true,
                        }, {
                            title: '婚姻状况',
                            type: 'entity',
                            name: 'isMarry',
                            value: '',
                            items: [{
                                text: "已婚",
                                value: "0"
                            }, {
                                    text: "未婚",
                                    value: "1"
                                }],
                            disabled: false,
                            required: false,
                        }]
                }, {
                    title: '其他信息',
                    child: [{
                        title: '投资金额',
                        type: 'number',
                        name: 'investmentMoney',
                        value: '',
                        disabled: false,
                        required: true,
                    }, {
                            title: '投资时间',
                            name: 'investmentTime',
                            type: 'date-time',
                            value: '',
                            disabled: false,
                            required: true,
                        }, {
                            title: '投资产品',
                            name: 'investmentProduct',
                            type: 'entity',
                            value: '',
                            items: [{
                                text: "天天牛",
                                value: "0"
                            }, {
                                    text: "步步高升",
                                    value: "1"
                                }, {
                                    text: "马到成功",
                                    value: "2"
                                }, {
                                    text: "深圳特供",
                                    value: "3"
                                }],
                            disabled: false,
                            required: false,
                        }, {
                            title: '联系方式',
                            name: 'contacts',
                            type: 'text',
                            value: '',
                            disabled: false,
                            required: false,
                        }, {
                            title: '联系地址',
                            name: 'contactsAddress',
                            type: 'text',
                            value: '',
                            disabled: false,
                            required: false,
                        }]
                }
            ]
        }

        ms.selectData = [];
        ms.saveData = {};
        ms.selectValue = function (item) {
            nowForm = item;
            if (item.items) {
                ms.modalName = item.name;
                ms.modalTitle = item.title;
                ms.selectData = item.items;
                ms.modal.show();
            }
        }
        ms.updateValue = function (item) {
            ms.modal.hide();
            each(ms.items.info, function (value, key) {
                each(value.child, function (childValue, childKey) {
                    if (nowForm.title == childValue.title) {
                        childValue.value = item.text;
                    }
                })
            })
        }

        //保存功能
        ms.saveData = function () {
            each(ms.items.info, function (value, key) {
                each(value.child, function (childValue, childKey) {
                    if (childValue.name == "customerName") {
                        ms.items.title = childValue.value;
                    }
                })
            })
            if (playlistId) {
                PlaylistsData.saveData(ms.items, playlistId);
                MyPopupFactory.showPopup({
                    // title : '',
                    template: '<h4 class="text-center">保存成功</h4>'
                }, false);
            } else {
                // ms.items.title = ms.items.info[0].child[0].value;
                ms.items.id = PlaylistsData.getData().length;
                PlaylistsData.addData(ms.items);
                MyPopupFactory.showPopup({
                    template: '添加成功'
                }, true);
            }
        }

        //更新部分
        if (playlistId) {
            ms.items = App.filter("getDetailData")(PlaylistsData.getData(), playlistId);
            changeTimeFormat();
        }


        global.isFirstLoading = false;
    })