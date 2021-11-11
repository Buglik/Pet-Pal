import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../../api/src";
import {FormDirective} from "../../utils/form.directive";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends FormDirective<LoginRequest> {

  hidePassword: boolean = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  get formControl(): AbstractControl {
    return this.form;
  }

  formToJson(): LoginRequest {
    return this.form.value;
  }

  showMeForm() {
    console.log(this.form)
  }

}
