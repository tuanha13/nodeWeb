import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../component/admin/admin.component';

const appRoutes: Routes = [
    { path: '/', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '/dashboard', component: AdminComponent },

    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });