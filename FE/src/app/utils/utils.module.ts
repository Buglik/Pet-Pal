import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldErrorsComponent} from "./form-field-errors/form-field-errors.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ButtonComponent} from './button/button.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotificationModule} from "./notification/notification.module";


@NgModule({
  declarations: [FormFieldErrorsComponent, ButtonComponent],
  exports: [
    FormFieldErrorsComponent,
    ButtonComponent,
    NotificationModule,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NotificationModule,
  ]
})
export class UtilsModule {
}
