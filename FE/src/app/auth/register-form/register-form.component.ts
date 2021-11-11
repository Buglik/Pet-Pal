import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegisterRequest} from "../../../api/src";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import Validation from "../../utils/Validation";
import {Observable, of} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() formSubmitted: EventEmitter<RegisterRequest> = new EventEmitter<RegisterRequest>();
  @Input() pending: boolean = false;
  @Input() errors: Observable<any> = of(null);

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  form = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.maxLength(200)]
    ],
    first_name: ['', [
      Validators.required,
      Validators.maxLength(200)]
    ],
    last_name: ['', [
      Validators.required,
      Validators.maxLength(200)]
    ],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255)]
    ],
    confirmPassword: ['', [Validators.required]]
  }, {validators: [Validation.match('password', 'confirmPassword')]})

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.errors.pipe(filter(err => err)).subscribe(error => {
      Object.keys(error).forEach(prop => {
        const control = this.form.get(prop);
        if (control) {
          control.setErrors({
            serverError: error[prop]
          })
        }
      })
    })
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
