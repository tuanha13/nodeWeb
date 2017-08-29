"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var admin_component_1 = require("../component/admin/admin.component");
var appRoutes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: admin_component_1.AdminComponent },
    { path: '404', component: admin_component_1.AdminComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
