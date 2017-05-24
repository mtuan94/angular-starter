import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { DataResolver } from './app.resolver';
import { StatisticComponent } from './statistic';
import { TopUserComponent } from './topUser';
import { AutoVoteComponent } from './autoVote';
export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'statistic', component: StatisticComponent },
  { path: 'top-user', component: TopUserComponent },
  { path: 'auto-vote', component: AutoVoteComponent },
  { path: '**',    component: NoContentComponent },
];
