import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Router } from '@angular/router';
import { Redirect } from '@angular/router-deprecated';
import { Location } from '@angular/common';

import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";
import * as global from './globals';

@Injectable()
export class HttpClient {
  private _token: string;
  private _user: any;
  private userSubject: Subject<string>;
  constructor(
    private http: Http,
    private location: Location,
    private _jwtHelper: JwtHelper
  ){
    this.userSubject = new Subject<string>();
    this._token = localStorage.getItem('statistic_token_abc'); 
    this._user = this.decodeJWT(this._token);
  }

  isAuthenticated(): boolean {
    return this.token ? true : false;
  }
  logout(){
    localStorage.removeItem('statistic_token_abc');
    this.token = null;
    this._user = null;
  }
  createAuthorizationHeader(headers:Headers) {
    return this.token ? headers.append('Authorization', 'Bearer ' + this.token) : headers;
  }

  get(url: string) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).catch(this.handleError);
  }

  post(url: string , body: any, createAuthHeader: Boolean) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if(createAuthHeader)this.createAuthorizationHeader(headers);
    return this.http.post(url,body,
      {
      headers: headers
    });
  }

  postWithCustomizeToken(url, body, token){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + token)
    return this.http.post(url,body,
      {
      headers: headers
    });
  }

  decodeJWT(tokenString: string){
    return (tokenString && tokenString.length && tokenString !== 'null') ? this._jwtHelper.decodeToken(tokenString) : null;
  }


  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    localStorage.setItem('statistic_token_abc', token);
    this.userSubject.next(this.decodeJWT(token));
  }

  get user(): any {
    return this._user;
  }

  get observableUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  private handleError(err: any) {
    return Observable.throw(err);
  }

}
