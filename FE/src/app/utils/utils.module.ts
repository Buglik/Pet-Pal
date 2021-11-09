import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldErrorsComponent} from "./form-field-errors/form-field-errors.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ButtonComponent} from './button/button.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [FormFieldErrorsComponent, ButtonComponent],
  exports: [
    FormFieldErrorsComponent,
    ButtonComponent
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ]
})
export class UtilsModule { }
