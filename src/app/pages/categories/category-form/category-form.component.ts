import {Component, OnInit, AfterContentChecked} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../shared/category.model';
import {CategoryService} from '../shared/category.service';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  currentAction: string = null;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
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

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction == 'edit') {
      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe(
        (category) => {
          this.category = category;
          // bind loaded category data to CategoryForm
          this.categoryForm.patchValue(JSON.parse(JSON.stringify(category)));
        }, (error) => alert('An error occurred on the server, try again later')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Create new category';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editing category ' + categoryName;
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category)
      .subscribe(
        ktegory => this.actionsForSuccess(ktegory),
        error => this.actionsForError(error)
      );
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category)
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

  private actionsForSuccess(ktegory: Category) {
    this.toastr.success('Congratulation process success!');
    // redirect/reload category page
    this.router.navigate(['categories'], {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', ktegory.id, 'edit'])
    );
  }
}
