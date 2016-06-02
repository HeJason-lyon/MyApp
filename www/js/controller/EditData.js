angular.module('myApp')
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