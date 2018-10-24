import { Component, OnInit, Inject } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IPost, IComment, IApiResponse, ICom, LikeComment, } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { DataService } from '../core/services/data.service';
//import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LoggerService } from '../core/services/logger.service';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'cm-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postsBaseUrl = ''
  like_dislike_com: LikeComment = {
    id: '',
    index: 0
  };
  post: IPost;
  com: ICom =
    {
      comment: '',
      id: ''
    };
  comment: IComment =
    {
      text: '',
      createUser: '',
      commentDate: new Date(Date.now()),
      likes:0,
      dislikes:0
    };

  detailForm :FormGroup;
  errorMessage:string;
  

  /* commentForm = this.fb.group({
    comments: this.fb.array([
      this.fb.control('')
    ])
  }); */
  constructor(private route: ActivatedRoute, 
              private dataService: DataService, 
              private fb: FormBuilder,
              private growler: GrowlerService,
              private router: Router,
    private logger: LoggerService,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.postsBaseUrl = baseUrl + 'api/Post/';
  }

  ngOnInit() {
    this.detailForm = this.fb.group({
      comments: this.fb.array([])
    })
  

    // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.dataService.getPost(id)
          .subscribe((post: IPost) => {
            this.post = post;
            if(!this.post.likes) this.post.likes = 0;
            if(!this.post.dislikes) this.post.dislikes = 0;
          });
      }
    });
  }

  get commentFroms (){
    return this.detailForm.get('comments') as FormArray
  }

  addComment() {
    const comment = this.fb.group({
        text:[],
    })
    this.commentFroms.push(comment);
  }

  deleteComment(i){
    this.commentFroms.removeAt(i);
  }
  
  async saveComment(i) {
    var item = this.commentFroms.at(i).value;
    this.comment.text = item.text;
    this.com.comment = item.text;
    this.com.id = this.post._id;
    //var id = this.post._id;
    //this.dataService.insertComment(this.com)
    await this.http.put<IApiResponse>(this.postsBaseUrl, this.com)
         .subscribe( status =>
         {
           if (status.status) {
              this.growler.growl('Comment Inserted', GrowlerMessageType.Success);
              this.errorMessage = 'Comment Inserted';
              this.post.comments.push(this.comment);
              this.deleteComment(i);
             }
             else{
              this.growler.growl('Unable to insert comment', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  async likePost() {

    //this.dataService.likePost(this.post)
    await this.http.put<IApiResponse>(this.postsBaseUrl + 'like/', this.post)
         .subscribe( status =>
         {
           if (status.status) {
              this.growler.growl('I liked it. \\\(^.^)/', GrowlerMessageType.Success);
              this.errorMessage = 'I liked it';
              ++this.post.likes;
             }
             else{
              this.growler.growl('Unable to insert comment', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  async dislikePost() {
    await this.http.put<IApiResponse>(this.postsBaseUrl + 'dislike/', this.post)
    //this.dataService.dislikePost(this.post)
         .subscribe( status =>
         {
           if (status.status) {
              this.growler.growl('I disliked it. /(^.^)\\', GrowlerMessageType.Success);
              this.errorMessage = 'I disliked it';
              ++this.post.dislikes;
             }
             else{
              this.growler.growl('Unable to insert dislike', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  async likeComment(id, index) {
    this.like_dislike_com.id = id;
    this.like_dislike_com.index = index;
    //await this.dataService.likeComment(this.like_dislike_com)
    await this.http.put<IApiResponse>(this.postsBaseUrl + 'likecomment/', this.like_dislike_com)
         .subscribe( status =>
         {
           if (status.status) {
              this.growler.growl('I liked the comment. \\\(^.^)/', GrowlerMessageType.Success);
              this.errorMessage = 'I liked it';
              ++this.post.comments[index].likes;
             }
             else{
              this.growler.growl('Unable to insert comment', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
 async dislikeComment(id,index) {
    this.like_dislike_com.id = id;
    this.like_dislike_com.index = index;
    //this.dataService.dislikeComment(this.like_dislike_com)
    await this.http.put<IApiResponse>(this.postsBaseUrl + 'dislikecomment/', this.like_dislike_com)
         .subscribe(status=>
         {
           if (status.status) {
              this.growler.growl('I disliked the comment. /(^.^)\\', GrowlerMessageType.Success);
              this.errorMessage = 'I disliked it';
              ++this.post.comments[index].dislikes;
             }
             else{
              this.growler.growl('Unable to insert dislike', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  onSubmit(){}
}
