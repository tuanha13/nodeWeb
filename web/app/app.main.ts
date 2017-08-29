import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';

export function RunApplication(appsettings: any) {
	enableProdMode();
	const platform = platformBrowserDynamic([{ provide: 'appsettings', useValue: appsettings }]);
	platform.bootstrapModule(AppModule);
}
