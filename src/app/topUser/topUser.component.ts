import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '../shared/httpClient.service';
import { StatisticService } from '../statistic/statistic.service';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'about',
  providers: [StatisticService, HttpClient],
  templateUrl: './topUser.component.html',
  styleUrls: [
    './topUser.css'
  ]
})
export class TopUserComponent implements OnInit {
  listTopUser: Array<any>;
  point: number = 50;
  constructor(
    public route: ActivatedRoute,
    private _statisticService: StatisticService,
    private iconRegistry: MdIconRegistry, 
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
        'like',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/like.svg'));
    iconRegistry.addSvgIcon(
        'unlike',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/unlike.svg'));

    iconRegistry.addSvgIcon(
        'up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/up.svg'));
    iconRegistry.addSvgIcon(
        'down',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/down.svg'));
  }

  public ngOnInit() {
    this.getListTopUser();
  }

  getListTopUser(){
    this._statisticService.getListTopUser().subscribe(result => {
      this.listTopUser = result;
    })
  }

  increasePoint(user_id){
    this._statisticService.increaseUserPoint(user_id, this.point).subscribe(result => {
      this.getListTopUser();
    }); 
  }

  decreasePoint(user_id){ 
    this._statisticService.decreaseUserPoint(user_id, this.point).subscribe(result => {
      this.getListTopUser();
    });
  }

}
