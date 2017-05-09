/*
    ================================================================
	Desc:       File định nghĩa hàm common cho website
	Author:     ThanhNH9 - 0938.388.112
    CDate:      2016.03.08
    ================================================================
*/
'use strict';

(function (w) {
    'use strict';

    w.WBER = WBER = {
        //
        version: '1.0',
        //
        browser: {
            version: (navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
            safari: /webkit/.test(navigator.userAgent.toLowerCase()),
            opera: /opera/.test(navigator.userAgent.toLowerCase()),
            msie: (/msie/.test(navigator.userAgent.toLowerCase())) && (!/opera/.test(userAgent)),
            mozilla: (/mozilla/.test(navigator.userAgent.toLowerCase())) && (!/(compatible|webkit)/.test(navigator.userAgent.toLowerCase()))
        },
        //
        plugins: {
        },
        //
        getXML: function () {
            'use strict';

            try {
                var xmlDoc;
                if (typeof window.DOMParser != "undefined") {
                    xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("GET", this.xmlPath, false);
                    if (xmlhttp.overrideMimeType) {
                        xmlhttp.overrideMimeType('text/xml');
                    }
                    xmlhttp.send();
                    xmlDoc = xmlhttp.responseXML;
                }
                else {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = "false";
                    xmlDoc.load(this.xmlPath);
                }
                return xmlDoc.getElementsByTagName("plugin");
            }
            catch (err) { throw console.log("Error: " + err); }
        },
        //
        getXMLstring: function (txt) {
            'use strict';

            try {
                var xmlDoc;
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(txt, "text/xml");
                }
                else {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(txt);
                }
                return xmlDoc.getElementsByTagName("plugin");
            }
            catch (err) { throw console.log("Error: " + err); }
        },
        //
        createTag: function (tagName, source, id, target) {
            'use strict';

            if (document.getElementById(id)) return;

            target = target || $(document.getElementsByTagName(tagName)[0].parentNode);

            var _ele;
            tagName.toLowerCase() === "script" ? (function () { _ele = document.createElement("script"); _ele.setAttribute("type", "text/javascript"); _ele.setAttribute("src", source); _ele.setAttribute("id", id); })()
												: (function () { _ele = document.createElement("link"); _ele.setAttribute("type", "text/css"); _ele.setAttribute("rel", "stylesheet"); _ele.setAttribute("href", source); _ele.setAttribute("id", id); })()
            target.append(_ele);
        },
        //
        library: [],
        //
        checkLib: function (libName) {
            var bool = false;
            for (var y = 0; y < this.library.length; y++) {
                if (this.library[y].getAttribute('name') != "" && libName === this.library[y].getAttribute('name')) {
                    bool = true;
                    break;
                }
            }
            return bool;
        },
        //
        getLib: function (libName) {
            var lib = {};
            for (var y = 0; y < this.library.length; y++) {
                if (this.library[y].name != "" && libName === this.library[y].name) {
                    lib.js = this.library[y].jspath;
                    lib.css = this.library[y].csspath;
                    lib.isWait = this.library[y].isWait;
                    break;
                }
            }
            return lib;
        },
        //
        getArrUnique: function (arr) {
            var _arr = [];
            for (var i = 0; i < arr.length; i++) {
                var __arr = arr, _exsits = 0;
                for (var y = i; y < __arr.length; y++) {
                    if (arr[i] === __arr[y]) _exsits++;
                }
                if (_exsits <= 1) _arr.push(arr[i]);
            }
            return _arr;
        },
        //
        registerUserControl: function (target, control, func) {
            (function (WBER) {
                //clear current controller
                target.html('');

                //init lib
                var lib = {
                    name: control.Code,
                    js: control.JsPath,
                    css: control.CssPath
                };

                //append js
                if (lib.js != "")
                    WBER.createTag("script", lib.js, "script_sdk_" + lib.name, target);
                if (lib.css != "")
                    WBER.createTag("link", lib.css, "link_sdk_" + lib.name, target);

                var _complete = false, _timer,
                    wait = function () {
                        if (_complete) { clearTimeout(_timer); run(); return; }
                        eval("window.WBER_CONTROLLER") != undefined ? _complete = true : _complete = false;
                        _timer = setTimeout(wait, 100);
                    },
                    run = function () {
                        console.log("Appended controller: " + lib.name);
                        if (typeof func === 'function') func();
                    };
                wait();
            })(this);
        },
        //
        registers: function (names, func) {
            'use strict';

            names = names.replace(/^\s+|\s+$/g, '');
            if (names != undefined && names != "") {
                if (typeof (names) === "string") {
                    names = names.split(",");
                }
                if (typeof (names) === "object") {
                    names = this.getArrUnique(names);
                    var _count = 0, _len = names.length, _complete = false, _cout = 0,
					wait = function (name) {
					    (function () {
					        var _timer = null;
					        if (_complete) { _timer != null ? clearTimeout(_timer) : _complete = false; run(name); return; }

					        _complete = WBER.checkPlugin(name);

					        _timer = setTimeout(function () { wait(name); }, 50);
					    })();
					},
					run = function (name) {
					    _count++;
					    console.log("Created: " + name);
					    if (_count === _len) {
					        if (typeof func == "function") func();
					    }
					};

                    for (var i = 0; i < _len; i++) {
                        (function (WBER) {
                            if (!WBER.checkPlugin(names[i])) {
                                var lib = WBER.getLib(names[i]);
                                if (lib.js != "")
                                    WBER.createTag("script", lib.js, "script_sdk_" + names[i]);
                                if (lib.css != "")
                                    WBER.createTag("link", lib.css, "link_sdk_" + names[i]);

                                console.log(lib.isWait);
                                if (typeof (lib.isWait) !== 'undefined' && lib.isWait == true) {
                                    wait(names[i]);

                                }
                                else {
                                    run(names[i]);
                                }
                            } else { console.log("Exist: " + names[i] + "\n"); }
                        })(this);
                    }
                }
            }
        },
        //
        checkPlugin: function (name) {
            'use strict';

            return (eval("window." + name) != undefined || eval("window.jQuery.fn." + name) != undefined) ? true : false;
        }

    }

})(window);
