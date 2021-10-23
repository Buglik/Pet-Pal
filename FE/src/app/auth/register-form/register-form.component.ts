import {Component, EventEmitter, Output} from '@angular/core';
import {RegisterRequest} from "../../../api/src";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  @Output() formSubmitted: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>();

  form = this.fb.group({
    username: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

  constructor(private readonly fb: FormBuilder) {
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get username() {
    return this.form.get('username');
  }

  get firstName() {
    return this.form.get('first_name');
  }

  get lastName() {
    return this.form.get('last_name');
  }

  formToJson(): RegisterRequest {
    const {confirmPassword, ...registerData} = this.form.value
    return registerData
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formToJson());
  }
}
