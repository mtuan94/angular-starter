import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '../shared/httpClient.service';
import { StatisticService } from '../statistic/statistic.service';
import { Clone } from './clone';
import { JwtHelper } from 'angular2-jwt';
import { Task } from './task';

import { Observable } from 'rxjs/Rx';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'auto-vote',
  providers: [StatisticService, HttpClient, JwtHelper],
  templateUrl: './autoVote.component.html',
  styleUrls: [
    './autoVote.css'
  ]
})
export class AutoVoteComponent implements OnInit {
  addedClones: Array<Clone> = [];
  optionTime: number = 0;
  optionIsUpvote: boolean = true;
  arrayTasks: Array<Task> = [];
  username: any;
  password: any;
  timer: any;
  postSlug: any;
  numberVoteClone: number;

  constructor(
    public route: ActivatedRoute,
    private _statisticService: StatisticService,
    private _jwtHelper: JwtHelper,
    private iconRegistry: MdIconRegistry, 
    private sanitizer: DomSanitizer,
    public dialog: MdDialog,
  ) {
    iconRegistry.addSvgIcon(
        'user',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/user.svg'));
    iconRegistry.addSvgIcon(
        'task',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/task.svg'));
    iconRegistry.addSvgIcon(
        'clone',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/clone.svg'));
  }

  public ngOnInit() {
    
    this.addedClones = JSON.parse(localStorage.getItem('array-clone'));
    //todo innit timer 1 minute
    let timer = Observable.timer(2000,1000 * 10);
		this.timer = timer.subscribe((t: any)=>{
      console.log('timer tick -------------');

      //todo execute pedding tasks
      this.executePeddingTasks();
		});
  }

  countInArray(array, what) {
    return array.filter(item => item == what).length;
  }

  executePeddingTasks(){
    this.arrayTasks.forEach((task : Task) => {
      if(task.couter >= task.randomArrayTime[task.randomArrayTime.length -1] || task.randomArrayTime.length < 1 || task.indexClone > task.arrayClone.length - 1) return ;
      task.couter ++;

      if (task.couter != task.randomArrayTime[0]) return;

      let count = this.countInArray(task.randomArrayTime, task.couter);
      for(let j=0; j<count; j++){
        let popedClone = task.arrayClone[task.indexClone];
        task.indexClone ++;
        this._statisticService.voteWithClone(task.isUpvote, task.postData._id, popedClone.jwt).subscribe(
          (result: any) => {
            task.success++;
          }, (err: any) => {
            task.fallue++;
          });
      }
      task.randomArrayTime.splice(0, count);
    });
  }

  saveArrayCloneTOClocal(){
    localStorage.setItem('array-clone', JSON.stringify(this.addedClones));
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(token => {
      if(!token) return;
      let jwtObj = this.decodeJWT(token);
      if(this.addedClones && this.addedClones.length){
        let index = this.addedClones.findIndex((item) => {
          return item.name == jwtObj.name;
        });
        if(index >-1){
          this.addedClones[index] = jwtObj;
          return;        
        }
      }

      let cloneObj = {
        name: jwtObj.name,
        jwt: token
      };
      this.addedClones ? this.addedClones.push(cloneObj) : this.addedClones = [cloneObj]
      this.saveArrayCloneTOClocal();
    });
  }

  openAddTask(){
    let dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.componentInstance.addedClones = Array.from(this.addedClones);
    dialogRef.afterClosed().subscribe(taskData => {
      if(!taskData) return;
      this.arrayTasks.push(taskData);
    });
  }

  decodeJWT(tokenString: string){
    return this._jwtHelper.decodeToken(tokenString);
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

  constructor(
    public dialogRef: MdDialogRef<DialogComponent>,
    public route: ActivatedRoute,
    private _statisticService: StatisticService,
    ) {}
  submitLogin(){
    this._statisticService.login({
      name: this.username,
      password: this.password
    }).subscribe(result => {
      if (result.auth_token) {
          this.dialogRef.close(result.auth_token);
				}
    });
  }
}




@Component({
  selector: 'dialog-add-task-dialog',
  templateUrl: './dialog-add-task.html',
  styleUrls: [
    './dialog-add-task.css'
  ],
  providers: [StatisticService, HttpClient],
})
export class DialogAddTaskComponent {

  addedClones: Array<Clone> = [];
  optionTime: number = 0;
  optionIsUpvote: boolean = true;
  timer: any;
  postSlug: string;
  postData: any;
  postShortBody: string;
  numberVoteClone: number;

  constructor(
    public dialogRef: MdDialogRef<DialogAddTaskComponent>,
    public route: ActivatedRoute,
    private _statisticService: StatisticService,
    ) {
    }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  sortNumber(a,b) {
    return a - b;
  }

  checkPostSlug(){
    if(!this.postSlug) return;
    this._statisticService.getPost(this.postSlug).subscribe(
      (postData: any) => {
        if(!postData.post && !postData.post._id) return;
        this.postData = postData.post;
        let stripHtml = postData.post.body.replace(/<[^>]+>/gm, '');
        this.postData.shortBody = stripHtml.substr(0, stripHtml.lastIndexOf(' ', 100)) + "..."
      });
  }
      
      
  addTask(){
    //todo get post with postUrl
    if(this.numberVoteClone > this.addedClones.length) this.numberVoteClone = this.addedClones.length;
        //todo get random clone
        let arraySelectedClone : Array<Clone> = [];
        let arrayNoRepeatNum = Array.from(Array(this.numberVoteClone).keys());
        let addedTmp = this.addedClones;
        //create array selected clone list from arrayClone - no repeat
        for(let i = 0; i < this.numberVoteClone; i++){
          let j = this.getRandomInt(0, addedTmp.length - 1);
          arraySelectedClone.push(this.addedClones[j]);
          addedTmp.splice(j, 1);
        }
        
        let randomArray: Array<number> = [];
        for(let i=0; i<arraySelectedClone.length; i++){
          randomArray.push(this.getRandomInt(1, this.optionTime));
        }
        randomArray.sort(this.sortNumber);
        let pendingTask = {
          postData: this.postData,
          arrayClone: arraySelectedClone,
          indexClone: 0,
          timeDuration: this.optionTime,
          isUpvote: this.optionIsUpvote,
          randomArrayTime: randomArray,
          couter: 0,
          success: 0,
          fallue: 0    
        }
        this.dialogRef.close(pendingTask)
  }

}