import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoryListComponent} from '../categories/category-list/category-list.component';
import {CategoryFormComponent} from '../categories/category-form/category-form.component';
import {EntryListComponent} from './entry-list/entry-list.component';

const routes: Routes = [
  {path: '', component: EntryListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
