import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { NewPost} from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { LoggerService } from '../core/services/logger.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
//import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'cm-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  public progress: number;
  public message: string;
  selectedFile: File;
  //editorConfig: AngularEditorConfig = {
  //  editable: true,
  //  spellcheck: true,
  //  height: '25rem',
  //  minHeight: '5rem',
  //  placeholder: 'Add New Blog Content',
  //  translate: 'yes',
  //  uploadUrl: '/api/images',
  //  customClasses : []
  //}
 addForm: FormGroup;
  post: NewPost =
    {
      title: '',
      content: '',
      images: ''
    };
  //states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  postURL = '';
  uploadLocation = 'assets/images/';
  uploadFile = '';
  defaultFile = 'people.png';
  imageLocation = '';
  

 // @ViewChild('addForm') addForm: NgForm;



  constructor(private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private logger: LoggerService,
    private growler: GrowlerService,
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.postURL = baseUrl + 'api/Post';
    this.imageLocation = this.uploadLocation + this.defaultFile;

  }


  ngOnInit() {

    this.operationText = 'Add Post';
    this.buildForm(); 



    //this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files) {
      this.uploadFile = file.name;
      formData.append(file.name, file);
    }


    const uploadReq = new HttpRequest('POST', `api/upload`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = event.body.toString();
        if (this.message.trim() == 'Upload Successful.') {
          this.imageLocation = this.uploadLocation + this.uploadFile;
        }
        else {
          this.imageLocation = this.uploadLocation + this.defaultFile;
        };
        

      }
        
    });
  }

  buildForm() {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  };
  /* getPost(id: string) {
    this.dataService.getPost(id).subscribe((post: IPost) => {
      this.post = post;
    });
  } */

  async submit() {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    this.post.images = this.imageLocation;
   await this.http.post<NewPost>(this.postURL, this.post, { headers }).subscribe(result => {
      result;
     const msg = 'new post added';
     this.growler.growl(msg, GrowlerMessageType.Success);
    }, error => console.error(error));
    //this.router.navigate(['/listposts']);

    //var headers = new HttpHeaders().set('content-type', 'application/json');
    //this.http.post<IPost>(this.weatherURL, this.post, { headers }).subscribe(result => {
    //  result;
    //}, error => console.error(error));
    //const msg = 'Submit happened';

    //this.dataService.insertPost(this.post)
    //  .subscribe((insertedPost: NewPost) => {
    //    if (insertedPost) {
    //      // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
    //      //this.addForm.form.markAsPristine();
    //      this.router.navigate(['/posts']);
    //    } else {
    //      const msg = 'Unable to insert post';
    //      this.growler.growl(msg, GrowlerMessageType.Danger);
    //      this.errorMessage = msg;
    //    }
    //  },
    //    (err: any) => this.logger.log(err));

  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/listposts']);
  }



  canDeactivate(): Promise<boolean> | boolean {
    /*  if (!this.addForm.dirty) {
       return true;
     } */
    return true;
    // Dirty show display modal dialog to user to confirm leaving
    /* const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent); */
  }

}
