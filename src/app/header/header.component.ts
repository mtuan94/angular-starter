import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '../shared/httpClient.service';
import { StatisticService } from '../statistic/statistic.service';

import {MdDialog, MdDialogRef} from '@angular/material';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
	selector: 'header',
	styleUrls: [`./header.css`],
	templateUrl: './header.component.html',
  providers: [StatisticService, HttpClient]
})
export class HeaderComponent implements OnInit {
	public username: any;
  public password: any;
  isAuthenticated: boolean = false;
	user: any;
  public localState: any;

  selectedOption: string;


  constructor(
    public route: ActivatedRoute,
    public dialog: MdDialog,
    private _httpClient: HttpClient,
    private iconRegistry: MdIconRegistry, 
    private sanitizer: DomSanitizer    
  ) {
    iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/menu.svg'));
    this.isAuthenticated = this._httpClient.isAuthenticated();
    if(this.isAuthenticated){
      this.user = this._httpClient.user;
      this._httpClient.observableUser.subscribe((newUser: any) => {
        this.user = newUser;
        console.log(this.user);
      })
    }
  }

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
  }

  logout(){
    this._httpClient.logout();
  }

   openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(token => {
      this._httpClient.token = token;
    });
  }
}




@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog.html',
  providers: [StatisticService, HttpClient],
})
export class DialogComponent {
  public username: any;
  public password: any;
  token: string;
  user: any;
  public localState: any;

  constructor(
    public dialogRef: MdDialogRef<DialogComponent>,
    public route: ActivatedRoute,
    private _statisticService: StatisticService,
    ) {
      
    }


  submitLogin(){
    this._statisticService.login({
      name: this.username, password: this.password
    }).subscribe(result => {
      if (result.auth_token) {
          sessionStorage.setItem('statistic_token_abc', result.auth_token);
          this.dialogRef.close(result.auth_token)
				}
    });
  }
}