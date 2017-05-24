import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '../shared/httpClient.service';
import { StatisticService } from '../statistic/statistic.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'about',
  providers: [StatisticService, HttpClient, JwtHelper],
  templateUrl: './about.component.html'
})

export class AboutComponent implements OnInit {
  public username: any;
  public password: any;
  token: string;
  user: any;
  public localState: any;
  constructor(
    public route: ActivatedRoute,
    private _statisticService: StatisticService,
    private _jwtHelper: JwtHelper
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

  decodeJWT(tokenString: string){
    return this._jwtHelper.decodeToken(tokenString);
  }

  submitLogin(){
    this._statisticService.login({
      name: this.username, password: this.password
    }).subscribe(result => {
      if (result.auth_token) {
          sessionStorage.setItem('statistic_token_abc', result.auth_token);
          this.user = this.decodeJWT(result.auth_token);
				}
    });
  }

}
