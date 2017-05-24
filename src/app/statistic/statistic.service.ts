import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../shared/httpClient.service';

@Injectable()
export class StatisticService {
	// private _baseUrl = 'https://spiderum.com';
  private _baseUrl = 'http://localdomain.com';

  constructor(
    private _httpClient: HttpClient,
    private _http: Http
  ) {
  }

  login(user: any){

		return this._httpClient
			.post(
			this._baseUrl + '/api/v2/user/signin',
			JSON.stringify(user),
      false
			)
			.map((res: Response) => res.json());
  }

  getSignupUser(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getSignupUser?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getCreatedPosts(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberOfPosts?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getCreatedComments(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberOfComments?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getNumberVotePost(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberOfVotePost?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getNumberVoteComment(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberOfVoteComment?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }


  getNumberUserWritePost(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberUserWritePost?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getNumberUserComment(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberUserComment?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getNumberActiveUser(lowerDate: string, higherDate: string){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/statistic/getNumberActiveUser?lowerDate=' + lowerDate + '&higherDate=' + higherDate
      ).map(res => {
			return res.json();
		});
  }

  getListTopUser(){
    return this._httpClient.get(
      this._baseUrl +'/api/v2/user/getTopUsers'
      ).map(res => {
        return res.json();  
    });
  }

  increaseUserPoint(user_id, point: number){
    return this._httpClient
			.post(
			this._baseUrl + '/api/v2/user/increaseUserPoint',
			{
        user_id: user_id,
        point: point
      },
      true
			)
  }

  decreaseUserPoint(user_id, point: number){
    return this._httpClient
			.post(
			this._baseUrl + '/api/v2/user/decreaseUserPoint',
			{
        user_id: user_id,
        point: point
      },
      true
			)
  }

  getPost(postSlug: string){
    return this._http.get(
      this._baseUrl + '/api/v1/post/' + postSlug
    ).map((res: Response) => res.json());
  }

  voteWithClone(isUpvote: boolean, post_id: number, token: string){
    console.log(post_id);
    console.log(token);
    let action = isUpvote ? 2 : 0;
    return this._httpClient.postWithCustomizeToken(
      this._baseUrl + '/api/v1/relation/user-post/vote',
      {
        action: action,
        post_id: post_id
      },
      token
    ).map((res: Response) => res.json());
  }


}