import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import FIELD_VALIDATION_MESSAGES from "./field-validation-messages";

@Component({
  selector: 'app-form-field-errors',
  templateUrl: './form-field-errors.component.html',
  styleUrls: ['./form-field-errors.component.scss']
})
export class FormFieldErrorsComponent {

  @Input() control: AbstractControl | null;

  getErrorMessage(): string {
    if (this.control) {
      if (this.control.hasError('globalError')) return this.control.getError('globalError');
      if (this.control.hasError('serverError')) return this.control.getError('serverError');
      if (this.control.hasError('required')) return FIELD_VALIDATION_MESSAGES.required;
      if (this.control.hasError('minlength')) return FIELD_VALIDATION_MESSAGES.minlength;
      if (this.control.hasError('maxlength')) return FIELD_VALIDATION_MESSAGES.maxlength;
      if (this.control.hasError('email')) return FIELD_VALIDATION_MESSAGES.email;
      if (this.control.hasError('matching')) return FIELD_VALIDATION_MESSAGES.matching;
    }
    return '';
  }

}
