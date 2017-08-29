import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './component/admin/admin.component';
import { routing, appRoutingProviders }  from './service/service.route';

import { ConfigService } from './service/service.config';
import { RequestService } from './service/service.request';

@NgModule({
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        AdminComponent
    ],
    providers: [appRoutingProviders, ConfigService, RequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }
