angular.module('myApp')
    .controller('ContactsCtrl', function ($scope, $filter, $cordovaContacts) {
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
        ms.importContactArry = [];
        ms.groupContacts = []

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
            ms.groupContacts = ms.makeGroup();
        }
        ms.loadData();

    })