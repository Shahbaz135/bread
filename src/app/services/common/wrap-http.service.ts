import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class WrapHttpService {

  // tslint:disable-next-line: typedef
  private static createHeaderOptions(headers) {
    const user = AuthService.getLoggedUser();
    if (user) {
      if (!headers) {
        headers = {};
      }
      // headers['Content-Type'] = 'application/pdf';
      headers['Authorization'] = 'Bearer ' + user.tokenInfo;
      headers['Accept'] = '*/*';
    }

    const httpOptions = {};
    if (headers) {
      httpOptions['headers'] = new HttpHeaders(headers);
    }
    return httpOptions;
  }

  // tslint:disable-next-line: typedef
  public static objToQuery(obj) {
    if (!obj || _.isEmpty(obj)) {
      return '';
    }
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }
    return '?' + params;
  }

  constructor(private http: HttpClient) {}

  get(url: string, headers?: object): Observable<any> {
    // console.log(WrapHttpService.createHeaderOptions(headers));
    return this.http.get(url, WrapHttpService.createHeaderOptions(headers));
  }
  getPDF(url: string, headers?: object): Observable<any> {
    // console.log(WrapHttpService.createHeaderOptions(headers));
    return this.http.get(url, {responseType: 'blob'});
  }
  // get(url: string, headers?: object): Observable<any> {
  //   // console.log(WrapHttpService.createHeaderOptions(headers));
  //   return this.http.get(url, { headers: {'Content-Type': 'application/pdf'} });
  // }
  post(url: string, data: object, headers?: object): Observable<any> {
    return this.http.post(url, data, WrapHttpService.createHeaderOptions(headers));
  }
  put(url: string, data: object, headers?: object): Observable<any> {
    return this.http.put(url, data, WrapHttpService.createHeaderOptions(headers));
  }
  patch(url: string, data: object, headers?: object): Observable<any> {
    return this.http.patch(url, data, WrapHttpService.createHeaderOptions(headers));
  }
  delete(url: string, headers?: object): Observable<any> {
    return this.http.delete(url, WrapHttpService.createHeaderOptions(headers));
  }
}
