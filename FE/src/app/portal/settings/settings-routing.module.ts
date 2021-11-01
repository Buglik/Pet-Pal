import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SettingsPageComponent} from "./settings-page/settings-page.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";


const childRoutes: Routes = [
  {path: 'profile', component: MyProfileComponent},
  {path: '**', redirectTo: 'profile'}
]

const routes: Routes = [
  {path: '', component: SettingsPageComponent, children: childRoutes},
  {path: '**', redirectTo: ''}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SettingsRoutingModule {
}
