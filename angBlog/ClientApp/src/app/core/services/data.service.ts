import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IPost, NewPost, ICom, LikeComment, Status, IPagedResults, IApiResponse, IComment  } from '../../shared/interfaces';

@Injectable()
export class DataService {
  postsBaseUrl = ''


  constructor(private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.postsBaseUrl = baseUrl + 'api/Post/';
  }
  getPostsPage(page: number, pageSize: number): Observable<IPagedResults<IPost[]>> {
    return this.http.get<IPost[]>(
      `${this.postsBaseUrl}/page/${page}/${pageSize}`,
      //'/api/posts',
      { observe: 'response' })
      .pipe(
        map(res => {
          //const totalRecords = +res.headers.get('X-InlineCount');
          const totalRecords = +res.headers.get('X-InlineCount');
          const posts = res.body as IPost[];
          return {
            results: posts,
            totalRecords: totalRecords
          };
        }),
        catchError(this.handleError)
      );

  }
  getPost(id: string): Observable<IPost> {
    return this.http.get<IPost>(this.postsBaseUrl + '/' + id)
      .pipe(
        map(post => {
          return post;
        }),
        catchError(this.handleError)
      );
  }
  insertPost(post: NewPost): Observable<NewPost> {
    //var headers = new HttpHeaders().set('content-type', 'application/json');
    //this.http.post<NewPost>(this.postsBaseUrl, post, { headers }).subscribe(result => {
    //  result;

    //}, error => console.error(error));
    //this.router.navigate(['/posts']);
    return this.http.post<NewPost>(this.postsBaseUrl, post)
      .pipe(catchError(this.handleError));
  }
  likePost(post: IPost): Observable<boolean> {
    return this.http.put<IApiResponse>(this.postsBaseUrl + 'like/', post)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }
  likeComment(like: LikeComment): Observable<boolean>{
    return this.http.put<IApiResponse>(this.postsBaseUrl + 'likecomment/', like)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
   );
  }
  dislikePost(post: IPost): Observable<boolean> {
    return this.http.put<IApiResponse>(this.postsBaseUrl + 'dislike/', post)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }
  dislikeComment(disLike: LikeComment): Observable<boolean>{
   var ret = this.http.put<IApiResponse>(this.postsBaseUrl + 'dislikecomment/', disLike)
      .pipe(
        map(res => res.status),
     catchError(this.handleError)
    ).toPromise();
    var state = new Observable();

   
     

    return    this.http.put<IApiResponse>(this.postsBaseUrl + 'dislikecomment/', disLike)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }


  insertComment(comment: ICom): Observable<boolean> {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    //let params = new HttpParams().set('id', post).set('comment', comment.text);
    // params = params.append('id', post);
    // params = params.append('comment', comment.text);
    //const options = { params: params, headers: headers };
    return this.http.put<IApiResponse>(this.postsBaseUrl, comment)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }
  updatePost(post: IPost): Observable<boolean> {
    return this.http.put<IApiResponse>(this.postsBaseUrl + '/' + post._id, post)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }

  deletePost(id: string): Observable<boolean> {
    return this.http.delete<IApiResponse>(this.postsBaseUrl + '/' + id)
      .pipe(
        map(res => res.status),
        catchError(this.handleError)
      );
  }







  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }



  // Not using now but leaving since they show how to create
  // and work with custom observables

  // Would need following import added:
  // import { Observer } from 'rxjs';

  // createObservable(data: any): Observable<any> {
  //     return Observable.create((observer: Observer<any>) => {
  //         observer.next(data);
  //         observer.complete();
  //     });
  // }

}
