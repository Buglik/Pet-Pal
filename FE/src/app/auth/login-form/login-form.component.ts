import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../../api/src";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() formSubmitted = new EventEmitter<LoginRequest>();

  hidePassword: boolean = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private readonly fb: FormBuilder) {
  }

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  formToJson(): LoginRequest {
    return this.form.value;
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formToJson());
  }

}
