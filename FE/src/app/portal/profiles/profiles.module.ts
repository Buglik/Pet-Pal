import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilesComponent} from './profiles/profiles.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {ProfileListComponent} from './profiles/profile-list/profile-list.component';


@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilePageComponent,
    ProfileListComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
