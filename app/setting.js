/* jshint node: true */
'use strict';

/* declare obj __ */
var __                   = module.exports = {} || function(){};
/* init properties of __ object */
__.init = function() {
    __.fs                  = require('fs'); // Package File System
    __.http                = require('http'); // Package
    __.http.port           = process.env.PORT || '9000';
    __.http.ip             = process.env.IP || '127.0.0.1';
    __.express             = require('express'); // Package Express
    __.app                 = __.express();
    __.router              = __.express.Router();
    __.pug                 = require('pug'); // Package template pug
    __.bodyParser          = require('body-parser'); // Package
    __.mongoose            = require('mongoose'); // Package
    // __.socket              = require('socket.io');
    __.path                = require('path');
    __.monk                = require('monk');
    __.db                  = __.monk('localhost:27017/nodeWeb');
    __.connected           = false;
    __.helper              = require('./helper.js');
    __.adminPath           = '/admin'; // root admin query string
    __.layout              = 'default'; // Layout for admin
    __.app.set('views', './web/layout/' + __.layout);
    __.app.set('view engine', 'pug');

    __.app.use('/templates', __.express.static(__.path.join(__dirname, '../web/modules')));
    __.app.use('/photos', __.express.static(__.path.join(__dirname, '../web/image')));
    __.app.use('/oss', __.express.static(__.path.join(__dirname, '../web/lib')));
    __.app.use('/scripts', __.express.static(__.path.join(__dirname, '../web/js')));
    __.app.use('/styles', __.express.static(__.path.join(__dirname, '../web/css')));
};
__.init();

/* connect to mongoDB */
__.connecDB = function(callback) {
    __.mongoose.connect('mongodb://'+ __.http.ip +'/nodeWeb');

    var dbMongo = __.mongoose.connection;
    dbMongo.on('error', console.error.bind(console, 'connection error:'));

    dbMongo.once('open', function(){
        __.connected = true;
        callback(dbMongo);
        console.log('MongoDb connected');
    });
};
