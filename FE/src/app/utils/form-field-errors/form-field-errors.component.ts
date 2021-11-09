import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-form-field-errors',
  templateUrl: './form-field-errors.component.html',
  styleUrls: ['./form-field-errors.component.scss']
})
export class FormFieldErrorsComponent {

  @Input() control: AbstractControl;
  @Input() backendErrors ?: any;

  getErrorMessage(): string {
    if (this.backendErrors) {
      //TODO: handle backend errors
    } else if (this.control) {
      if (this.control.hasError('required')) return 'This field is required';
      if (this.control.hasError('minlength')) return 'This field is too short';
      if (this.control.hasError('maxlength')) return 'This field is too long';
      if (this.control.hasError('email')) return 'This field has to be an email';
      if (this.control.hasError('matching')) return 'This field does not match';
    }
    return '';
  }

}
