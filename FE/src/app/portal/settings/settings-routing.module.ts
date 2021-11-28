import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SettingsPageComponent} from "./settings-page/settings-page.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {PetSitterSettingsComponent} from "./pet-sitter-settings/pet-sitter-settings.component";
import {ContactInfoComponent} from "./contact-info/contact-info.component";


const childRoutes: Routes = [
  {path: 'profile', component: MyProfileComponent},
  {path: 'contact', component: ContactInfoComponent},
  {path: 'pet-sitting', component: PetSitterSettingsComponent},
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
