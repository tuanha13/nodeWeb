"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var app_module_1 = require("./app.module");
function RunApplication(appsettings) {
    core_1.enableProdMode();
    var platform = platform_browser_dynamic_1.platformBrowserDynamic([{ provide: 'appsettings', useValue: appsettings }]);
    platform.bootstrapModule(app_module_1.AppModule);
}
exports.RunApplication = RunApplication;
