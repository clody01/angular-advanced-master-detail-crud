import {Component, OnInit, AfterContentChecked} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ToastrModule} from 'ngx-toastr';
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
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  // PRIVATE METHODS
  private setCurrentAction() {
   if (this.activatedRouter.snapshot.url[0].path == 'new') {
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
      this.activatedRouter.paramMap.pipe(
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
}
