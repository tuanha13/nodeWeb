/*
	jwber.v1.0.js
*/
'use strict';

(function (w) {
    'use strict';

    w.WBER = w.WBER || {}

    /*
		************** CÁC BIẾN DÙNG CHUNG
	*/
    //WBER version
    WBER.version = "1.0.1";

    //Thư viện đường dẫn các plugins/objs
    WBER.library = [];

    //object dinh nghia cac bien trang thai
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/25
    WBER.status = {
        isWait: true
    };

    /*
		************** CÁC THƯ VIỆN DÙNG CHUNG
	*/
    //function lay ve index trong arr cua bien truyen vao
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/26
    //status:	ok
    WBER.fn_arrIndexOf = function (value, arr) {
        try {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return i;
                }
            }
        } catch (err) { console.log(err); }

        return -1;
    };

    //function kiem tra plugin theo ten
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/26
    //status:	ok
    WBER.fn_checkPlugin = function (name) {
        try {
            if (name != "" && !/\s/.test(name)) {
                return eval("w." + name) != undefined || eval("w.jQuery." + name) != undefined;
            }
        } catch (err) { }

        return true;
    }

    //function khoi tao tag html
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/26
    //status:	ok
    WBER.fn_createTag = function (source, target) {
        if (document.getElementById(source.id)) return;
        var ele,
			nodes = document.getElementsByTagName(source.type + "")[0],
            target = target || (nodes == undefined ? null : nodes.parentNode);
			
        //lấy về thẻ head nếu _root không có
        if (target == undefined || target == null)
            target = document.getElementsByTagName("head")[0];
        //lấy về thẻ body nếu _root không có
        if (target == undefined || target == null)
            target = document.getElementsByTagName("body")[0];

        if (source.type.toLowerCase() === "script") {
            (function () {
                ele = document.createElement("script");
                ele.setAttribute("type", "text/javascript");
                ele.setAttribute("src", source.src);
                ele.setAttribute("id", source.id);
            })();
        }
        else {
            (function () {
                ele = document.createElement("link");
                ele.setAttribute("type", "text/css");
                ele.setAttribute("rel", "stylesheet");
                ele.setAttribute("href", source.src);
                ele.setAttribute("id", source.id);
            })();
        }

        $(target).append(ele);
    };

    //function khoi tao cac gia tri cho WBER
    //author:	thanhit8387@gmail.com
    //cdate:	2016/04/28
    //status:	working...
    WBER.fn_init = function () {
        $(function () {
            //append loader to page
            $('<div/>', {
                id: 'jwber-loader'
            }).append('<div class="circle1"></div><div class="circle2"></div>').appendTo('body');
        });
    };

    //function kiem tra event truyen vao co phai la right click hay khong
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/30
    //status:	ok
    WBER.fn_isRightClick = function (event) {
        var rightclick = false;
        try {
            if (!event) var event = window.event;
            if (event.which) rightclick = (event.which == 3);
            else if (event.button) rightclick = (event.button == 2);
        } catch (ex) { }
        return rightclick;
    };

    //function thực hiện việc đồng bộ 2 objects
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/26
    //status:	ok
    WBER.fn_join = function (opts1, opts2) {
        if (opts2 === undefined) opts2 = {};
        var _obj = {};
        for (var i in opts1) { _obj[i] != opts2[i] ? _obj[i] = opts2[i] : _obj[i] = opts1[i]; }
        return _obj;
    };

    //function loại bỏ các phần tử trùng nhau trong mảng truyền vào
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/26
    //status:	ok
    WBER.fn_getArrUnique = function (arr) {
        var _arr = [];
        for (var i = 0; i < arr.length; i++) {
            if (WBER.fn_arrIndexOf(arr[i], _arr) == -1) {
                _arr.push(arr[i]);
            }
        }
        return _arr;
    };

    //function lay ve thu vien plugin theo ten
    //author:	
    //cdate:	unknown
    //status:	ok
    WBER.fn_getLib = function (libName) {
        var lib = {
            js: '',
            css: ''
        };

        for (var i = 0; i < WBER.library.length; i++) {
            if (WBER.library[i].name != "" && libName.toLowerCase() === WBER.library[i].name.toLowerCase()) {
                lib.js = WBER.library[i].jspath;
                lib.css = WBER.library[i].csspath;
                break;
            }
        }
        return lib;
    };

    //function thực hiện hàm chờ cho đến khi các objs thực thi xong
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/25
    //status:	ok
    WBER.fn_register = function (names, fn) {
        //loại bỏ các ký tự đặc biệt
        names = names.replace(/^\s+|\s+$/g, '');
        if (names != undefined && names != "") {
            //neu names truyen vao la dang string e.g: "admin, lazy, , thanhit8387@gmail.com"
            if (typeof (names) === "string") {
                names = names.split(",");
            }
            //neu vao la obj e.g: [admin, lazy, , thanhit8387@gmail.com]
            if (typeof (names) === "object") {
                //loai bo phan tu trung nhau
                names = WBER.fn_getArrUnique(names);
                var objs = [];
                for (var i = 0; i < names.length; i++) {
                    //get lib
                    var lib = WBER.fn_getLib(names[i]);
                    //create tag
                    var _sources = [];

                    if (lib.js != "") {
                        var _srcs = lib.js.split(',');
                        for (var j = 0; j < _srcs.length; j++) {
                            _sources.push({
                                type: "script",
                                src: _srcs[j],
                                id: "script_sdk_" + _srcs[j].replace(/\//g, '_')
                            });
                        }
                    }
                    if (lib.css != "") {
                        var _srcs = lib.css.split(',');
                        for (var j = 0; j < _srcs.length; j++) {
                            _sources.push({
                                type: "link",
                                src: _srcs[j],
                                id: "link_sdk_" + _srcs[j].replace(/\//g, '_')
                            });
                        }
                    }
                    else { }

                    if (_sources.length === 0) { }
                    else {
                        for (var j = 0; j < _sources.length; j++) {
                            WBER.fn_createTag(_sources[j]);
                        }
                        //init obj check in wait
                        objs.push({
                            obj: names[i],
                            check: function () {
                                return WBER.fn_checkPlugin(this.obj);
                            }
                        });
                    }
                    //run wait...
                    WBER.fn_wait(objs, fn);
                }
            }
        }
    };

    //function thực hiện đăng ký thư viện js/css khi load usercontrol
    //author:	thanhit8387@gmail.com
    //cdate:	2016/05/09
    //status:	ok
    WBER.fn_registerUserControl = function (target, control, callback) {
        (function (WBER) {
            //clear current controller
            target.html('');

            //init lib
            var lib = {
                name: control.code,
                js: control.jsPath,
                css: control.cssPath
            };

            var _complete = false, _timer,
                wait = function () {
                    if (_complete) { clearTimeout(_timer); run(); return; }
                    eval("window.WBER_CONTROLLER") != undefined ? _complete = true : _complete = false;
                    _timer = setTimeout(wait, 100);
                },
                run = function () {
                    console.log("Appended UserControl: " + lib.name);
                    if (typeof callback === 'function') callback();
                };

            //append js
            if (lib.js != "") {
                WBER.fn_createTag(
                    {
                        type: "script",
                        src: lib.js,
                        id: "script_sdk_" + lib.name.replace(/\//g, '_')
                    },
                    target
                );

                wait();
            } else {
                run();
            }

            //append css
            if (lib.css != "") {
                WBER.fn_createTag(
                    {
                        type: "link",
                        src: lib.css,
                        id: "link_sdk_" + lib.name.replace(/\//g, '_')
                    },
                    target
                );
            }

        })(this);
    }

    //function thực hiện đăng ký thư viện js/css khi load widget
    //author:	thanhit8387@gmail.com
    //cdate:	2016/05/09
    //status:	ok
    WBER.fn_registerWidget = function (target, widget, callback) {
        (function (WBER) {
            //clear current controller
            target.html('');

            //init lib
            var lib = {
                name: widget.code,
                js: widget.jsPath,
                css: widget.cssPath
            };

            var _complete = false, _timer,
                wait = function () {
                    if (_complete) { clearTimeout(_timer); run(); return; }
                    eval("window." + widget.code) != undefined ? _complete = true : _complete = false;
                    _timer = setTimeout(wait, 100);
                },
                run = function () {
                    console.log("Appended Widget: " + lib.name);
                    if (typeof callback === 'function') callback();
                };

            //append js
            if (lib.js != "") {
                WBER.fn_createTag(
                    {
                        type: "script",
                        src: lib.js,
                        id: "script_sdk_" + lib.name.replace(/\//g, '_')
                    },
                    target
                );

                wait();
            } else {
                run();
            }

            //append css
            if (lib.css != "") {
                WBER.fn_createTag(
                    {
                        type: "link",
                        src: lib.css,
                        id: "link_sdk_" + lib.name.replace(/\//g, '_')
                    },
                    target
                );
            }

        })(this);
    }

    //function show loader khi thực hiện chờ...
    //author:	thanhit8387@gmail.com
    //cdate:	2016/04/28
    //status:	ok
    WBER.fn_ShowLoader = function (interval) {
        //scroll top 
        window.scrollTo(0, 0);
        //get object loader
        var sender = document.getElementById("jwber-loader");
        sender.style.display = "block";
        sender.style.opacity = 1;
        //check timeout to hide
        if (typeof (interval) !== 'undefined' && interval !== null && !isNaN(interval)) {
            setTimeout(function () {
                fn_HideLoader();
            }, interval);
        }
    };

    //function hide loader
    //author:	thanhit8387@gmail.com
    //cdate:	2016/04/28
    //status:	ok
    WBER.fn_HideLoader = function () {
        var sender = document.getElementById("jwber-loader");
        sender.style.opacity = 0;
        setTimeout(function () {
            sender.style.display = "none";
        }, 1200);
    };

    //function thực hiện hàm chờ cho đến khi các objs thực thi xong
    //author:	thanhit8387@gmail.com
    //cdate:	2014/07/25
    //status:	ok
    WBER.fn_wait = function (objs, fn) {
        WBER.status.isWait = true;
        var _count = 0,
			_len = objs.length,
			fn_loop = function (obj) {
			    (function () {
			        var _timer = null;
			        if (WBER.status.isWait == false || obj.check()) {
			            clearTimeout(_timer);
			            if (WBER.status.isWait == false) {
			                return;
			            }
			            else {
			                fn_run();
			            }
			        }
			        _timer = setTimeout(function () { fn_loop(obj) }, 1000);
			    })();
			},
			fn_run = function () {
			    _count++;
			    if (_count === _len)
			        if (fn != undefined && typeof fn === "function")
			            fn();
			};

        for (var i = 0; i < objs.length; i++) {
            fn_loop(objs[i]);
        }
    }

    //khoi tao gia tri ban dau
    WBER.fn_init();
})(window);