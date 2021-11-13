import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldErrorsComponent} from "./form-field-errors/form-field-errors.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ButtonComponent} from './button/button.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotificationModule} from "./notification/notification.module";
import {FormDirective} from './form.directive';
import {LanguagePickerComponent} from './language-picker/language-picker.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [FormFieldErrorsComponent, ButtonComponent, FormDirective, LanguagePickerComponent],
  exports: [
    FormFieldErrorsComponent,
    ButtonComponent,
    NotificationModule,
    LanguagePickerComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NotificationModule,
    TranslateModule,
  ]
})
export class UtilsModule {
}
