import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { NewPost} from '../shared/interface';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { LoggerService } from '../core/services/logger.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'cm-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostAddComponent implements OnInit {
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
      content: ''
    };
  //states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  weatherURL = '';

  

 // @ViewChild('addForm') addForm: NgForm;



  constructor(private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private logger: LoggerService,
    private growler: GrowlerService,
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.weatherURL = baseUrl + 'api/Post';
  }


  ngOnInit() {

    this.operationText = 'Add Post';
    this.buildForm(); 



    //this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
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

  submit() {
    var headers = new HttpHeaders().set('content-type', 'application/json');
    this.http.post<NewPost>(this.weatherURL, this.post, { headers }).subscribe(result => {
      result;
    }, error => console.error(error));
    //var headers = new HttpHeaders().set('content-type', 'application/json');
    //this.http.post<IPost>(this.weatherURL, this.post, { headers }).subscribe(result => {
    //  result;
    //}, error => console.error(error));
    //const msg = 'Submit happened';

    //this.dataService.insertPost(this.post)
    //  .subscribe((insertedPost: IPost) => {
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
    this.router.navigate(['/posts']);
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
