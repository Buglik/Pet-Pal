import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
    RegisterFormComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {
}
