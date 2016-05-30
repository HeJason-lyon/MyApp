angular.module('myApp.service', [])
    .constant('IsHideTabs', ['app.tabs.playlistSingle', 'app.tabs.addData'])
    .constant('App', {
        version: '1.0.0'
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
            showPopup: function (options, isBack, callback) {
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
    .factory('PlaylistsData', function () {
        var deferred;
        var promise;
        var data = [
            {
                "title": "王大",
                "id": 0,
                "info": [
                    {
                        "title": "基本信息",
                        "child": [
                            {
                                "title": "客户姓名",
                                "type": "text",
                                "name": "customerName",
                                "value": "王大",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "性别",
                                "type": "entity",
                                "name": "sex",
                                "items": [
                                    {
                                        "text": "男",
                                        "value": "0"
                                    },
                                    {
                                        "text": "女",
                                        "value": "1"
                                    }
                                ],
                                "value": "男",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "职业",
                                "type": "entity",
                                "name": "job",
                                "items": [
                                    {
                                        "text": "Web前端工程师",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Java工程师",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Android工程师",
                                        "value": "2"
                                    },
                                    {
                                        "text": "IOS工程师",
                                        "value": "3"
                                    }
                                ],
                                "value": "Web前端工程师",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "办理时间",
                                "name": "crateTime",
                                "type": "date",
                                "value": "2010-10-10",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "婚姻状况",
                                "type": "entity",
                                "name": "isMarry",
                                "value": "已婚",
                                "items": [
                                    {
                                        "text": "已婚",
                                        "value": "0"
                                    },
                                    {
                                        "text": "未婚",
                                        "value": "1"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            }
                        ]
                    },
                    {
                        "title": "其他信息",
                        "child": [
                            {
                                "title": "投资金额",
                                "type": "number",
                                "name": "investmentMoney",
                                "value": "100000000",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资时间",
                                "name": "investmentTime",
                                "type": "date-time",
                                "value": "2015-12-25 10:30",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资产品",
                                "name": "investmentProduct",
                                "type": "entity",
                                "value": "天天牛",
                                "items": [
                                    {
                                        "text": "天天牛",
                                        "value": "0"
                                    },
                                    {
                                        "text": "步步高升",
                                        "value": "1"
                                    },
                                    {
                                        "text": "马到成功",
                                        "value": "2"
                                    },
                                    {
                                        "text": "深圳特供",
                                        "value": "3"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系方式",
                                "name": "contacts",
                                "type": "text",
                                "maxLength": 11,
                                "pattern": "/0?(13|14|15|18)[0-9]{9}/",
                                "value": "13046521188",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系地址",
                                "name": "contactsAddress",
                                "type": "text",
                                "value": "深圳市",
                                "disabled": false,
                                "required": false
                            }
                        ]
                    }
                ]
            },
            {
                "title": "张三",
                "id": 1,
                "info": [
                    {
                        "title": "基本信息",
                        "child": [
                            {
                                "title": "客户姓名",
                                "type": "text",
                                "name": "customerName",
                                "value": "张三",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "性别",
                                "type": "entity",
                                "name": "sex",
                                "items": [
                                    {
                                        "text": "男",
                                        "value": "0"
                                    },
                                    {
                                        "text": "女",
                                        "value": "1"
                                    }
                                ],
                                "value": "男",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "职业",
                                "type": "entity",
                                "name": "job",
                                "items": [
                                    {
                                        "text": "Web前端工程师",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Java工程师",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Android工程师",
                                        "value": "2"
                                    },
                                    {
                                        "text": "IOS工程师",
                                        "value": "3"
                                    }
                                ],
                                "value": "Java工程师",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "办理时间",
                                "name": "crateTime",
                                "type": "date",
                                "value": "2015-10-25",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "婚姻状况",
                                "type": "entity",
                                "name": "isMarry",
                                "value": "未婚",
                                "items": [
                                    {
                                        "text": "已婚",
                                        "value": "0"
                                    },
                                    {
                                        "text": "未婚",
                                        "value": "1"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            }
                        ]
                    },
                    {
                        "title": "其他信息",
                        "child": [
                            {
                                "title": "投资金额",
                                "type": "number",
                                "name": "investmentMoney",
                                "value": "1000000",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资时间",
                                "name": "investmentTime",
                                "type": "date-time",
                                "value": "2015-12-27 10:00",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资产品",
                                "name": "investmentProduct",
                                "type": "entity",
                                "value": "马到成功",
                                "items": [
                                    {
                                        "text": "天天牛",
                                        "value": "0"
                                    },
                                    {
                                        "text": "步步高升",
                                        "value": "1"
                                    },
                                    {
                                        "text": "马到成功",
                                        "value": "2"
                                    },
                                    {
                                        "text": "深圳特供",
                                        "value": "3"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系方式",
                                "name": "contacts",
                                "type": "text",
                                "maxLength": 11,
                                "pattern": "/0?(13|14|15|18)[0-9]{9}/",
                                "value": "13046596188",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系地址",
                                "name": "contactsAddress",
                                "type": "text",
                                "value": "广州市",
                                "disabled": false,
                                "required": false
                            }
                        ]
                    }
                ]
            },
            {
                "title": "李四",
                "id": 2,
                "info": [
                    {
                        "title": "基本信息",
                        "child": [
                            {
                                "title": "客户姓名",
                                "type": "text",
                                "name": "customerName",
                                "value": "李四",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "性别",
                                "type": "entity",
                                "name": "sex",
                                "items": [
                                    {
                                        "text": "男",
                                        "value": "0"
                                    },
                                    {
                                        "text": "女",
                                        "value": "1"
                                    }
                                ],
                                "value": "女",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "职业",
                                "type": "entity",
                                "name": "job",
                                "items": [
                                    {
                                        "text": "Web前端工程师",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Java工程师",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Android工程师",
                                        "value": "2"
                                    },
                                    {
                                        "text": "IOS工程师",
                                        "value": "3"
                                    }
                                ],
                                "value": "Android工程师",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "办理时间",
                                "name": "crateTime",
                                "type": "date",
                                "value": "2015-10-20 8:00",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "婚姻状况",
                                "type": "entity",
                                "name": "isMarry",
                                "value": "已婚",
                                "items": [
                                    {
                                        "text": "已婚",
                                        "value": "0"
                                    },
                                    {
                                        "text": "未婚",
                                        "value": "1"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            }
                        ]
                    },
                    {
                        "title": "其他信息",
                        "child": [
                            {
                                "title": "投资金额",
                                "type": "number",
                                "name": "investmentMoney",
                                "value": "100000000",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资时间",
                                "name": "investmentTime",
                                "type": "date-time",
                                "value": "2015/12/25",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资产品",
                                "name": "investmentProduct",
                                "type": "entity",
                                "value": "深圳特供",
                                "items": [
                                    {
                                        "text": "天天牛",
                                        "value": "0"
                                    },
                                    {
                                        "text": "步步高升",
                                        "value": "1"
                                    },
                                    {
                                        "text": "马到成功",
                                        "value": "2"
                                    },
                                    {
                                        "text": "深圳特供",
                                        "value": "3"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系方式",
                                "name": "contacts",
                                "type": "text",
                                "maxLength": 11,
                                "pattern": "/0?(13|14|15|18)[0-9]{9}/",
                                "value": "13042361188",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系地址",
                                "name": "contactsAddress",
                                "type": "text",
                                "value": "北京市",
                                "disabled": false,
                                "required": false
                            }
                        ]
                    }
                ]
            },
            {
                "title": "三傻",
                "id": 3,
                "info": [
                    {
                        "title": "基本信息",
                        "child": [
                            {
                                "title": "客户姓名",
                                "type": "text",
                                "name": "customerName",
                                "value": "三傻",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "性别",
                                "type": "entity",
                                "name": "sex",
                                "items": [
                                    {
                                        "text": "男",
                                        "value": "0"
                                    },
                                    {
                                        "text": "女",
                                        "value": "1"
                                    }
                                ],
                                "value": "男",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "职业",
                                "type": "entity",
                                "name": "job",
                                "items": [
                                    {
                                        "text": "Web前端工程师",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Java工程师",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Android工程师",
                                        "value": "2"
                                    },
                                    {
                                        "text": "IOS工程师",
                                        "value": "3"
                                    }
                                ],
                                "value": "Web前端工程师",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "办理时间",
                                "name": "crateTime",
                                "type": "date",
                                "value": "2015/10/20",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "婚姻状况",
                                "type": "entity",
                                "name": "isMarry",
                                "value": "已婚",
                                "items": [
                                    {
                                        "text": "已婚",
                                        "value": "0"
                                    },
                                    {
                                        "text": "未婚",
                                        "value": "1"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            }
                        ]
                    },
                    {
                        "title": "其他信息",
                        "child": [
                            {
                                "title": "投资金额",
                                "type": "number",
                                "name": "investmentMoney",
                                "value": "100000000",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资时间",
                                "name": "investmentTime",
                                "type": "date-time",
                                "value": "2015/12/25",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资产品",
                                "name": "investmentProduct",
                                "type": "entity",
                                "value": "天天牛",
                                "items": [
                                    {
                                        "text": "天天牛",
                                        "value": "0"
                                    },
                                    {
                                        "text": "步步高升",
                                        "value": "1"
                                    },
                                    {
                                        "text": "马到成功",
                                        "value": "2"
                                    },
                                    {
                                        "text": "深圳特供",
                                        "value": "3"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系方式",
                                "name": "contacts",
                                "type": "text",
                                "maxLength": 11,
                                "pattern": "/0?(13|14|15|18)[0-9]{9}/",
                                "value": "13046521188",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系地址",
                                "name": "contactsAddress",
                                "type": "text",
                                "value": "深圳市",
                                "disabled": false,
                                "required": false
                            }
                        ]
                    }
                ]
            },
            {
                "title": "霸天",
                "id": 4,
                "info": [
                    {
                        "title": "基本信息",
                        "child": [
                            {
                                "title": "客户姓名",
                                "type": "text",
                                "name": "customerName",
                                "value": "霸天",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "性别",
                                "type": "entity",
                                "name": "sex",
                                "items": [
                                    {
                                        "text": "男",
                                        "value": "0"
                                    },
                                    {
                                        "text": "女",
                                        "value": "1"
                                    }
                                ],
                                "value": "男",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "职业",
                                "type": "entity",
                                "name": "job",
                                "items": [
                                    {
                                        "text": "Web前端工程师",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Java工程师",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Android工程师",
                                        "value": "2"
                                    },
                                    {
                                        "text": "IOS工程师",
                                        "value": "3"
                                    }
                                ],
                                "value": "Web前端工程师",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "办理时间",
                                "name": "crateTime",
                                "type": "date",
                                "value": "2015/10/20",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "婚姻状况",
                                "type": "entity",
                                "name": "isMarry",
                                "value": "已婚",
                                "items": [
                                    {
                                        "text": "已婚",
                                        "value": "0"
                                    },
                                    {
                                        "text": "未婚",
                                        "value": "1"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            }
                        ]
                    },
                    {
                        "title": "其他信息",
                        "child": [
                            {
                                "title": "投资金额",
                                "type": "number",
                                "name": "investmentMoney",
                                "value": "100000000",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资时间",
                                "name": "investmentTime",
                                "type": "date-time",
                                "value": "2015/12/25",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资产品",
                                "name": "investmentProduct",
                                "type": "entity",
                                "value": "天天牛",
                                "items": [
                                    {
                                        "text": "天天牛",
                                        "value": "0"
                                    },
                                    {
                                        "text": "步步高升",
                                        "value": "1"
                                    },
                                    {
                                        "text": "马到成功",
                                        "value": "2"
                                    },
                                    {
                                        "text": "深圳特供",
                                        "value": "3"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系方式",
                                "name": "contacts",
                                "type": "text",
                                "maxLength": 11,
                                "pattern": "/0?(13|14|15|18)[0-9]{9}/",
                                "value": "13046521188",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系地址",
                                "name": "contactsAddress",
                                "type": "text",
                                "value": "深圳市",
                                "disabled": false,
                                "required": false
                            }
                        ]
                    }
                ]
            },
            {
                "title": "司机",
                "id": 5,
                "info": [
                    {
                        "title": "基本信息",
                        "child": [
                            {
                                "title": "客户姓名",
                                "type": "text",
                                "name": "customerName",
                                "value": "司机",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "性别",
                                "type": "entity",
                                "name": "sex",
                                "items": [
                                    {
                                        "text": "男",
                                        "value": "0"
                                    },
                                    {
                                        "text": "女",
                                        "value": "1"
                                    }
                                ],
                                "value": "男",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "职业",
                                "type": "entity",
                                "name": "job",
                                "items": [
                                    {
                                        "text": "Web前端工程师",
                                        "value": "0"
                                    },
                                    {
                                        "text": "Java工程师",
                                        "value": "1"
                                    },
                                    {
                                        "text": "Android工程师",
                                        "value": "2"
                                    },
                                    {
                                        "text": "IOS工程师",
                                        "value": "3"
                                    }
                                ],
                                "value": "Web前端工程师",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "办理时间",
                                "name": "crateTime",
                                "type": "date",
                                "value": "2015/10/20",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "婚姻状况",
                                "type": "entity",
                                "name": "isMarry",
                                "value": "已婚",
                                "items": [
                                    {
                                        "text": "已婚",
                                        "value": "0"
                                    },
                                    {
                                        "text": "未婚",
                                        "value": "1"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            }
                        ]
                    },
                    {
                        "title": "其他信息",
                        "child": [
                            {
                                "title": "投资金额",
                                "type": "number",
                                "name": "investmentMoney",
                                "value": "100000000",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资时间",
                                "name": "investmentTime",
                                "type": "date-time",
                                "value": "2015/12/25",
                                "disabled": false,
                                "required": true
                            },
                            {
                                "title": "投资产品",
                                "name": "investmentProduct",
                                "type": "entity",
                                "value": "天天牛",
                                "items": [
                                    {
                                        "text": "天天牛",
                                        "value": "0"
                                    },
                                    {
                                        "text": "步步高升",
                                        "value": "1"
                                    },
                                    {
                                        "text": "马到成功",
                                        "value": "2"
                                    },
                                    {
                                        "text": "深圳特供",
                                        "value": "3"
                                    }
                                ],
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系方式",
                                "name": "contacts",
                                "type": "text",
                                "maxLength": 11,
                                "pattern": "/0?(13|14|15|18)[0-9]{9}/",
                                "value": "13046521188",
                                "disabled": false,
                                "required": false
                            },
                            {
                                "title": "联系地址",
                                "name": "contactsAddress",
                                "type": "text",
                                "value": "深圳市",
                                "disabled": false,
                                "required": false
                            }
                        ]
                    }
                ]
            }
        ]
        function getData() {
            return data;
        }
        function saveData(params, id) {
            return data[id] = params;
        }
        function addData(params) {
            return data.push(params);
        }
        return {
            getData: getData,
            saveData: saveData,
            addData: addData
        };
    })