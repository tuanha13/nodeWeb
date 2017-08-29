import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { ConfigService } from './service.config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

declare var $: any;

@Injectable()
export class RequestService {
	
	constructor(private http: Http, private config: ConfigService) {
	}

	public get(url: string, header: any): any {
		return this.sendRequest('GET', url, {}, header);
	}

	public post(url: string, data: any, header: any): any {
		return this.sendRequest('POST', url, data, header);
	}

	public put(url: string, data: any, header: any): any {
		return this.sendRequest('PUT', url, data, header);
	}

	public delete(url: string, header: any): any {
		return this.sendRequest('DELETE', url, {}, header);
	}

	private sendRequest(method: string, url: string, data: any, header: any): any {
		var _method: any;
		var _url = (url && (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1)) ? url : this.config.apiUrl + url;
		var _header = $.extend(this.config.header(), header || {});

		this.config.loading('show');

		switch (method) {
			case 'POST': _method = this.http.post(_url, data, _header).toPromise();
				break;
			case 'PUT': _method = this.http.put(_url, data, _header).toPromise();
				break;
			case 'DELETE': _method = this.http.delete(_url, _header).toPromise();
				break;
			default: _method = this.http.get(_url, _header).toPromise();
		}

		return _method
			.then($.proxy(function (res: Response) {
				this.config.loading('hide');
				return this.responseData(res);
			}, this))
			.catch($.proxy(function (error: Response | any) {
				this.config.loading('hide');
				return this.handleError(error);
			}, this));
	}

	private responseData(res: Response) {
		return Promise.resolve(res.json());
	}

	private handleError(error: Response | any) {
		return Promise.reject(error);
	}
}