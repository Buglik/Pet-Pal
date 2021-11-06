import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldErrorsComponent} from "./form-field-errors/form-field-errors.component";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [FormFieldErrorsComponent],
  exports: [
    FormFieldErrorsComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule
  ]
})
export class UtilsModule { }
