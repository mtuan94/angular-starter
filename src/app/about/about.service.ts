import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../shared/httpClient.service';

@Injectable()
export class StatisticService {
	private _baseUrl = 'http://localhost';
  constructor(
    private _httpClient: HttpClient,
    private _http: Http
  ) {}

  
}