import { Component, OnInit, AfterViewChecked, HostListener} from '@angular/core';
import { StatisticService } from './statistic.service';
import { HttpClient } from '../shared/httpClient.service';
import { Subscription }   from 'rxjs/Subscription';


// import 'rxjs/add/operator/fromEvent';
// import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  providers: [StatisticService, HttpClient]
})
export class StatisticComponent implements OnInit {
  public lowerDate: any;
  public higherDate: any;

  drawChat: boolean = false;
  numberUserLogin: any;
  numberCreatedPosts: any;
  numberCreatedComments: any;
  numberVotePost: any;
  numberVoteComment: any;


  numberUserWritePost: any;
  numberUserComment: any;
  numberActiveUser: any;

  // @HostListener("window:scroll", ['$event']) onWindowScroll($event) {
	// 	console.log("onscroll ------------")
	// }

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public ChartData:Array<any> = [
    { //user
      label: "user signup",
      data: [],
      type: "line",
      fill: "false"
    },
    { //post
      label: "post created",
      data: [],
      type: "line",
      fill: "false"
    },
    { //comment
      label: "comment",
      data: [],
      type: "line",
      fill: "false"
    },
    { //allvote action
      label: "all vote post",
      data: [],
      type: "line",
      fill: "false"
    },
    { //upvote
      label: "upvote post",
      data: [],
      type: "bar",
    },
    { //down vote
      label: "downvote post",
      data: [],
      type: "bar",
    },

    { //allvote action
      label: "all vote comment",
      data: [],
      type: "line",
      fill: "false"
    },
    { //upvote
      label: "upvote comment",
      data: [],
      type: "bar",
    },
    { //down vote
      label: "downvote comment",
      data: [],
      type: "bar",
    }
  ];

  public ChartLabels:Array<any> = [];


  public ChartColors:Array<any> = [
    { // user
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#986ae2',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },
    { // post
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#996600',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },
    { // comment
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#0066ff',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },

    { // all vote action
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#ffcc00',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },
    { // upvote
      backgroundColor: '#73dd89',
      borderColor: '#673AB7',
      pointBackgroundColor: '#673AB7',
      pointBorderColor: '#673AB7',
      pointHoverBackgroundColor: '#673AB7',
      pointHoverBorderColor: '#673AB7'
    },
    { // downvote
      backgroundColor: '#ff9999',
      borderColor: '#673AB7',
      pointBackgroundColor: '#673AB7',
      pointBorderColor: '#673AB7',
      pointHoverBackgroundColor: '#673AB7',
      pointHoverBorderColor: '#673AB7'
    },

    { // all vote action
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#ef45e3',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },
    { // upvote
      backgroundColor: '#45d6ef',
      borderColor: '#45d6ef',
      pointBackgroundColor: '#673AB7',
      pointBorderColor: '#673AB7',
      pointHoverBackgroundColor: '#673AB7',
      pointHoverBorderColor: '#673AB7'
    },
    { // downvote
      backgroundColor: '#f7824c',
      borderColor: '#f7824c',
      pointBackgroundColor: '#673AB7',
      pointBorderColor: '#673AB7',
      pointHoverBackgroundColor: '#673AB7',
      pointHoverBorderColor: '#673AB7'
    }
  ];

  ///behavior

   public behaviorChartData:Array<any> = [
    { //user
      label: "user write",
      data: [],
      type: "line",
      fill: "false"
    },
    { //post
      label: "user comment",
      data: [],
      type: "line",
      fill: "false"
    },
    { //comment
      label: "user active",
      data: [],
      type: "line",
      fill: "false"
    },
  ];

  public behaviorChartLabels:Array<any> = [];


  public behaviorChartColors:Array<any> = [
    { // user
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#986ae2',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },
    { // post
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#996600',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    },
    { // comment
      backgroundColor: 'rgba(115, 221, 137, 0)',
      borderColor: '#0066ff',
      HoverBackgroundColor: 'rgba(36, 148, 58, 0.77)',
      HoverBorderColor: 'rgba(36, 148, 58, 0.77)'
    }
  ];



  constructor(
    private _statisticService: StatisticService,
  ) {
    
  }
  public ngOnInit() {
    console.log('hello `Barrel` component');
  }

  public submitQuery(){
    this._statisticService.getSignupUser(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberUserLogin = result.overall;
        let arrayChartData = this.buidArrayChartData(result.eachDay, this.lowerDate, this.higherDate);
        this.ChartData[0] = {
          data: arrayChartData.map((x) => {return x.count;}),
          label: 'user signup',
          type: "line",
          fill: "false"
        }
        this.ChartLabels = arrayChartData.map((x) => {return x.time;});
      });
    this._statisticService.getCreatedPosts(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberCreatedPosts = result.overall;

        let arrayChartData = this.buidArrayChartData(result.eachDay, this.lowerDate, this.higherDate);
        this.ChartData[1] = {
          data: arrayChartData.map((x) => {return x.count;}),
          label: 'post created',
          type: "line",
          fill: "false"
        }
        this.ChartLabels = arrayChartData.map((x) => {return x.time;});
      });
    this._statisticService.getCreatedComments(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberCreatedComments = result.overall;

        let arrayChartData = this.buidArrayChartData(result.eachDay, this.lowerDate, this.higherDate);
        this.ChartData[2] = {
          data: arrayChartData.map((x) => {return x.count;}),
          label: 'comments created',
          type: "line",
          fill: "false"
        }
        this.ChartLabels = arrayChartData.map((x) => {return x.time;});
        
      });
    this._statisticService.getNumberVotePost(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberVotePost = result;
        if(result && result.all){
          let arrayChartAllData = this.buidArrayChartData(result.all.eachDay, this.lowerDate, this.higherDate);
          this.ChartData[3] = {
            data: arrayChartAllData.map((x) => {return x.count;}),
            label: 'vote post overall',
            type: 'line',
            fill: 'false'
          }
          this.ChartLabels = arrayChartAllData.map((x) => {return x.time;});
        }
        

        if(result && result.upvote){
          let arrayChartUpvoteData = this.buidArrayChartData(result.upvote.eachDay, this.lowerDate, this.higherDate);
          this.ChartData[4] = {
            data: arrayChartUpvoteData.map((x) => {return x.count;}),
            label: 'upvote post',
            type: 'bar',
          }
        }
        

        if(result && result.downvote){
          let arrayChartDownvoteData = this.buidArrayChartData(result.downvote.eachDay, this.lowerDate, this.higherDate);
          this.ChartData[5] = {
            data: arrayChartDownvoteData.map((x) => {return x.count;}),
            label: 'donwvote post',
            type: 'bar',
          }
        }
        
      });

    this._statisticService.getNumberVoteComment(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberVoteComment = result;
        if(result && result.all){
          let arrayChartAllData = this.buidArrayChartData(result.all.eachDay, this.lowerDate, this.higherDate);
          this.ChartData[6] = {
            data: arrayChartAllData.map((x) => {return x.count;}),
            label: 'vote comment',
            type: 'line',
            fill: 'false'
          }
          this.ChartLabels = arrayChartAllData.map((x) => {return x.time;});
        }
        

        if(result && result.upvote){
          let arrayChartUpvoteData = this.buidArrayChartData(result.upvote.eachDay, this.lowerDate, this.higherDate);
          this.ChartData[7] = {
            data: arrayChartUpvoteData.map((x) => {return x.count;}),
            label: 'upvote comment',
            type: 'bar',
          }
        }
        
        if(result && result.downvote){
          let arrayChartDownvoteData = this.buidArrayChartData(result.downvote.eachDay, this.lowerDate, this.higherDate);
          this.ChartData[8] = {
            data: arrayChartDownvoteData.map((x) => {return x.count;}),
            label: 'donwvote comment',
            type: 'bar',
          }
        }
      });


    this._statisticService.getNumberUserWritePost(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberUserWritePost = result.overall.length;
        let arrayChartData = this.buidArrayChartData(result.eachDay, this.lowerDate, this.higherDate);
        this.behaviorChartData[0] = {
          data: arrayChartData.map((x) => {return x.count;}),
          label: 'user write',
          type: "line",
          fill: "false"
        }
        this.behaviorChartLabels = arrayChartData.map((x) => {return x.time;});
      });
    this._statisticService.getNumberUserComment(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberUserComment = result.overall.length;
        let arrayChartData = this.buidArrayChartData(result.eachDay, this.lowerDate, this.higherDate);
        this.behaviorChartData[1] = {
          data: arrayChartData.map((x) => {return x.count;}),
          label: 'user comment',
          type: "line",
          fill: "false"
        }
        this.behaviorChartLabels = arrayChartData.map((x) => {return x.time;});
      })

    this._statisticService.getNumberActiveUser(this.lowerDate, this.higherDate)
      .subscribe(result => {
        this.numberActiveUser = result.overall;

        let arrayChartData = this.buidArrayChartData(result.eachDay, this.lowerDate, this.higherDate);
        this.behaviorChartData[2] = {
          data: arrayChartData.map((x) => {return x.count;}),
          label: 'user active',
          type: "line",
          fill: "false"
        }
        this.ChartLabels = arrayChartData.map((x) => {return x.time;});
      });

  }

  buidArrayChartData(dataEachDay: Array<any>, start: string, end: string){
    let startDate = new Date(start);
    let endDate = new Date(end);
    let arrayReturn = new Array<any>();
    let currentDate: Date = startDate;
    let arrayDate = dataEachDay.map((x)=> {return x._id;});
    let index = -1;
    while (currentDate <= endDate) {
      //todo find count value in dataEachDay
      index = arrayDate.findIndex(x => { 
        return x.day == currentDate.getDate() && x.month == currentDate.getMonth() + 1 && x.year == currentDate.getFullYear()
      });

      arrayReturn.push({
        time: currentDate.toDateString(),
        count: index > -1 ? dataEachDay[index].count : 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return arrayReturn;
  }

  chartHovered($event){

  }

  chartClicked($event){

  }

}
