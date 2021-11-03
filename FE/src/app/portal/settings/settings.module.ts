import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsPageHeaderComponent} from './settings-page-header/settings-page-header.component';
import {PortalModule} from "../portal.module";
import {PipesModule} from "../../pipes/pipes.module";
import {SettingsNavigationComponent} from './settings-navigation/settings-navigation.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MyProfileFormComponent} from './my-profile-form/my-profile-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SettingsPageComponent,
    SettingsPageHeaderComponent,
    SettingsNavigationComponent,
    MyProfileComponent,
    MyProfileFormComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PortalModule,
    PipesModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    FormBuilder
  ]
})
export class SettingsModule {
}
