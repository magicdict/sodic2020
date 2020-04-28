import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonFunction {

    constructor(
        private http: HttpClient
    ) { }

    private webapiurl = "http://39.105.206.6:8080/";
    //private webapiurl = "http://localhost:5000/";

    public httpRequestGet<T>(serviceUrl: string): Promise<T> {
        return this.http.get(
            this.webapiurl + serviceUrl
        )
            .toPromise()
            .then(response => {
                return response as T;
            })
            .catch(this.handleError);
    }


    public httpRequestGetFromAsset<T>(serviceUrl: string): Promise<T> {
        return this.http.get(
            "/assets/" + serviceUrl
        )
            .toPromise()
            .then(response => {
                return response as T;
            })
            .catch(this.handleError);
    }

    public httpRequestGetFromAssetAsXml(serviceUrl: string): Promise<any> {
        return this.http.get(
            "/assets/" + serviceUrl,
            { responseType: 'text' }
        )
            .toPromise()
            .then(response => {
                return response;
            })
            .catch(this.handleError);
    }

    public httpRequestPost<T>(serviceUrl: string, params: any = {}): Promise<T> {
        return this.http.post(
            this.webapiurl + serviceUrl,
            params
        )
            .toPromise()
            .then(response => {
                return response as T;
            })
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        //console.log('服务器访问失败');
        console.error('服务器访问失败', error);
        return Promise.reject(error.message || error);
    }
}

