import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    // SHARED MODULES
    CommonModule,
    ReactiveFormsModule,
    // SHARED COMPONENTS
    BreadCrumbComponent
  ]
})
export class SharedModule { }
