"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var service_config_1 = require("./service.config");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
var RequestService = (function () {
    function RequestService(http, config) {
        this.http = http;
        this.config = config;
    }
    RequestService.prototype.get = function (url, header, cb) {
        return this.sendRequest('GET', url, {}, header, cb);
    };
    RequestService.prototype.post = function (url, data, header, cb) {
        return this.sendRequest('POST', url, data, header, cb);
    };
    RequestService.prototype.put = function (url, data, header, cb) {
        return this.sendRequest('PUT', url, data, header, cb);
    };
    RequestService.prototype.delete = function (url, header, cb) {
        return this.sendRequest('DELETE', url, {}, header, cb);
    };
    RequestService.prototype.sendRequest = function (method, url, data, header, cb) {
        var _method;
        var _url = (url && (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)) ? url : this.config.apiUrl + url;
        var _header = $.extend(this.config.header(), header || {});
        this.config.loading('show');
        switch (method) {
            case 'POST':
                _method = this.http.post(_url, data, _header).toPromise();
                break;
            case 'PUT':
                _method = this.http.put(_url, data, _header).toPromise();
                break;
            case 'DELETE':
                _method = this.http.delete(_url, _header).toPromise();
                break;
            default: _method = this.http.get(_url, _header).toPromise();
        }
        return _method
            .then($.proxy(function (res) {
            if (typeof cb === 'function') {
                cb(res.json());
            }
            this.config.loading('hide');
            return this.responseData(res);
        }, this))
            .catch($.proxy(function (error) {
            this.config.loading('hide');
            return this.handleError(error);
        }, this));
    };
    RequestService.prototype.responseData = function (res) {
        return Promise.resolve(res.json());
    };
    RequestService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Promise.reject(errMsg);
    };
    return RequestService;
}());
RequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, service_config_1.ConfigService])
], RequestService);
exports.RequestService = RequestService;
