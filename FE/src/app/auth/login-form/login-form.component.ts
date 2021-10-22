import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../../api/src";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() formSubmitted = new EventEmitter<LoginRequest>();

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private readonly fb: FormBuilder) {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  formToJson(): LoginRequest {
    return this.form.value;
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formToJson());
  }

}
