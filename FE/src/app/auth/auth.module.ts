import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {EmailVerificationPageComponent} from './email-verification-page/email-verification-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {UtilsModule} from "../utils/utils.module";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {EmailVerificationFormComponent} from './email-verification-form/email-verification-form.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    EmailVerificationPageComponent,
    EmailVerificationFormComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        UtilsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
    ]
})
export class AuthModule {
}
