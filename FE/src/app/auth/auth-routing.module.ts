import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  // {path: 'register', component: RegisterPageComponent},
  // {path: 'activate', component: ActivationPageComponent},
  {path: '**', redirectTo: 'login'}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
