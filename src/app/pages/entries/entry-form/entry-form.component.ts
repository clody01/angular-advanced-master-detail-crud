import {Component, OnInit, AfterContentChecked} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Entry} from '../shared/entry.model';
import {EntryService} from '../shared/entry.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = null;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  // PRIVATE METHODS
  private setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
      console.log('this.currentAction : ', this.currentAction);
    } else {
      this.currentAction = 'edit';
    }
    console.log('After this.currentAction : ', this.currentAction);
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [null],
      categoryId: [null],
    });
  }

  private loadEntry() {
    if (this.currentAction == 'edit') {
      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          // bind loaded entry data to EntryForm
          this.entryForm.patchValue(JSON.parse(JSON.stringify(entry)));
        }, (error) => alert('An error occurred on the server, try again later')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Create new entry';
    } else {
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editing entry ' + entryName;
    }
  }

  private createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry)
      .subscribe(
        ktegory => this.actionsForSuccess(ktegory),
        error => this.actionsForError(error)
      );
  }

  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry)
      .subscribe(
        ktegory => this.actionsForSuccess(ktegory),
        error => this.actionsForError(error)
      );
  }

  private actionsForError(error: any) {
    this.toastr.error('An error occurred on the server!');
    this.submittingForm = false;
    if (error.status == 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['An error occurred on the server, try again later'];
    }
  }

  private actionsForSuccess(ntry: Entry) {
    this.toastr.success('Congratulation process success!');
    // redirect/reload entry page
    this.router.navigate(['entries'], {skipLocationChange: true}).then(
      () => this.router.navigate(['entries', ntry.id, 'edit'])
    );
  }
}
