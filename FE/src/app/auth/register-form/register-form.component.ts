import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RegisterRequest} from "../../../api/src";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import Validation from "../../utils/Validation";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  @Output() formSubmitted: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>();
  @Input() pending: boolean = false;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  form = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(200)]],
    first_name: ['', [Validators.required, Validators.maxLength(200)]],
    last_name: ['', [Validators.required, Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(255)]],
    confirmPassword: ['', [Validators.required]]
  }, {validators: [Validation.match('password', 'confirmPassword')]})

  constructor(private readonly fb: FormBuilder) {
  }

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

  get confirmPassword(): AbstractControl {
    return this.form.controls['confirmPassword'];
  }

  get username(): AbstractControl {
    return this.form.controls['username'];
  }

  get firstName(): AbstractControl {
    return this.form.controls['first_name'];
  }

  get lastName(): AbstractControl {
    return this.form.controls['last_name'];
  }

  formToJson(): RegisterRequest {
    const {confirmPassword, ...registerData} = this.form.value
    return registerData
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formToJson());
  }
}
