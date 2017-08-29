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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ConfigService = (function () {
    function ConfigService(appsettings) {
        this.appsettings = appsettings;
        this._loadingCount = 1;
        this.dateFormat = appsettings.dateFormat;
        this.timeFormat = appsettings.timeFormat;
        this.siteName = appsettings.siteName;
        this.itemsPerPage = appsettings.itemsPerPage;
        this.apiUrl = appsettings.apiUrl;
        this.apiSigninUrl = appsettings.apiSigninUrl;
        this.apiLocationUrl = appsettings.apiLocationUrl;
        this.apiOAuthUrl = appsettings.apiOAuthUrl;
        this.enableAngularProdMode = appsettings.enableAngularProdMode;
        this.loading = this.loadingFn;
        this.header = this.headerFn;
        this.convertSeconds2Time = this.convertSeconds2TimeFn;
        this.convertTime2Seconds = this.convertTime2SecondsFn;
    }
    ConfigService.prototype.loadingFn = function (action) {
        switch (action) {
            case 'show':
                var id = this._loadingCount++;
                $('<loading id="loading_' + id + '"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></loading>').appendTo('body');
                $('loading').show();
                break;
            case 'hide':
                $('loading:visible').last().remove();
                break;
        }
    };
    ConfigService.prototype.headerFn = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({
            headers: headers,
            withCredentials: true
        });
    };
    ConfigService.prototype.convertSeconds2TimeFn = function (seconds) {
        return moment().startOf('day').seconds(seconds).format(this.timeFormat);
    };
    ConfigService.prototype.convertTime2SecondsFn = function (time) {
        if (!time || time.toString().indexOf(':') === -1)
            return time;
        var time = time.split(':');
        var hours = parseInt(time[0], 10);
        var min = parseInt(time[1], 10);
        var sec = parseInt(time[2], 10);
        return (hours * 60 * 60) + (min * 60) + sec || 0;
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('appsettings')),
    __metadata("design:paramtypes", [Object])
], ConfigService);
exports.ConfigService = ConfigService;
