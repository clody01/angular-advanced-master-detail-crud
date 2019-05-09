import {Component, Injector, OnInit} from '@angular/core';
import {Entry} from '../shared/entry.model';
import {EntryService} from '../shared/entry.service';
import {Category} from '../../categories/shared/category.model';
import {CategoryService} from '../../categories/shared/category.service';
import {BaseResourceFormComponent} from '../../../shared/components/base-resource-form/base-resouce-form.component';
import {Validators} from '@angular/forms';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {
  categories: Array<Category>;
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  constructor(
    private entryService: EntryService,
    private categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
  }

  ngOnInit() {
    this.loadCategories();
    super.ngOnInit();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }

  // PROTECTED METHODS
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null],
    });
  }

  protected loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories);
  }
  protected creationPageTitle(): string {
    return 'Create new Entry';
  }

  protected editionPageTitle(): string {
    const entryName: string =  this.resource.name || '';
    return 'Editing entry : ' + entryName;
  }
}
