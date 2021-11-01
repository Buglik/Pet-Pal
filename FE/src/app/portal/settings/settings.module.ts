import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsPageHeaderComponent} from './settings-page-header/settings-page-header.component';
import {PortalModule} from "../portal.module";
import {PipesModule} from "../../pipes/pipes.module";
import {SettingsNavigationComponent} from './settings-navigation/settings-navigation.component';
import {MyProfileComponent} from './my-profile/my-profile.component';


@NgModule({
  declarations: [
    SettingsPageComponent,
    SettingsPageHeaderComponent,
    SettingsNavigationComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    PortalModule,
    PipesModule,
  ]
})
export class SettingsModule { }
