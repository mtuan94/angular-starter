/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  // templateUrl: './app.component.html'
  template: `


  <md-grid-list class="header" cols="1" rowHeight="53px">
    <header></header>
  </md-grid-list>
  <md-grid-list class="body" cols="4" rowHeight="100%">
    <md-grid-tile colspan="1" rowspan="1" class="nav-bar">


      <md-grid-list class="navbar" cols="1" rowHeight="47px">
        <md-grid-tile colspan="1" rowspan="1" class="nav-item">
          <a [routerLink]=" ['./'] "
            routerLinkActive="link-active" [routerLinkActiveOptions]= "{exact: true}">
            About
          </a>
        </md-grid-tile>

        <md-grid-tile colspan="1" rowspan="1" class="nav-item">
          <a [routerLink]=" ['./statistic'] "
            routerLinkActive="link-active" [routerLinkActiveOptions]= "{exact: true}">
            Statistic charts
          </a>
        </md-grid-tile>

        <md-grid-tile colspan="1" rowspan="1" class="nav-item">
          <a [routerLink]=" ['./top-user'] "
            routerLinkActive="link-active" [routerLinkActiveOptions]= "{exact: true}">
            Top user list
          </a>
        </md-grid-tile>

        <md-grid-tile colspan="1" rowspan="1" class="nav-item">
          <a [routerLink]=" ['./auto-vote'] "
            routerLinkActive="link-active" [routerLinkActiveOptions]= "{exact: true}">
            Auto vote tool
          </a>
        </md-grid-tile>
      </md-grid-list>

    </md-grid-tile>
    <md-grid-tile colspan="3" rowspan="1" class="content-bar">
      <main>
        <router-outlet></router-outlet>
      </main>
    </md-grid-tile>
  </md-grid-list>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
