/* jshint node: true */
'use strict';
var fs = require('fs');
var _ = require('underscore');
var path = require('path');

var routers = [];
var folders = [];

var getRouters = function () {
    if (routers.length) {
        return;
    }

    folders = folders.length ? folders : fs.readdirSync('./app');

    _.each(folders, function (item) {
        var strPath = path.resolve(__dirname, item);

        if (fs.lstatSync(strPath).isDirectory()) {
            routers.push({
                path: [adminPath, item].join('/'),
                middleware: ['./app', item, 'router.js'].join('/')
            });
        }
    });
    return routers;
};

exports.getRouters = getRouters;