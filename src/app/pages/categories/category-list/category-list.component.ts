import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../shared/category.service';
import {Category} from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error1 => alert('Error when opening a list'));
  }

  deleteCategory(category) {
    const mustDelete = confirm('Do you want to delete this category ?');
    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element.id != category.id),
        () => alert('Error when deleting this category '));
    }
  }
//  map(clients => clients.map(clt => clt.id == updatedClient.id ? updatedClient : clt)));
}
