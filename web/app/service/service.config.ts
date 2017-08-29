import { Injectable, Inject } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

declare var $: any;
declare var moment: any;
@Injectable()
export class ConfigService {
	_loadingCount: number;
	dateFormat: string;
	timeFormat: string;
	siteName: string;
	itemsPerPage: number;
	apiUrl: string;
	apiSigninUrl: string;
	apiLocationUrl: string;
	apiOAuthUrl: string;
	enableAngularProdMode: boolean;
	loading: Function;
	header: Function;
	convertSeconds2Time: Function;
	convertTime2Seconds: Function;

	constructor( @Inject('appsettings') private appsettings: any) {
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

	private loadingFn(action: string) {
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
	}
	private headerFn() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return new RequestOptions({
			headers: headers,
			withCredentials: true
		});
	}
	private convertSeconds2TimeFn(seconds: any) {
		return moment().startOf('day').seconds(seconds).format(this.timeFormat);
	}
	private convertTime2SecondsFn(time: any) {
		if (!time || time.toString().indexOf(':') === -1) return time;
		var time = time.split(':');
		var hours = parseInt(time[0], 10);
		var min = parseInt(time[1], 10);
		var sec = parseInt(time[2], 10);
		return (hours * 60 * 60) + (min * 60) + sec || 0;
	}
}