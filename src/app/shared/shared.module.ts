import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  exports: [
    // SHARED MODULES
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // SHARED COMPONENTS
    BreadCrumbComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
