import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilesComponent} from './profiles/profiles.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {ProfileListComponent} from './profiles/profile-list/profile-list.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {profileListFeature} from "../../state/app.state";
import {EffectsModule} from "@ngrx/effects";
import {SittersEffects} from "../../state/sitters/sitters.effects";
import {profilesReducer} from "../../state/profiles/profiles.reducer";
import {ProfilesEffects} from "../../state/profiles/profiles.effects";


@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilePageComponent,
    ProfileListComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    StoreModule.forFeature(profileListFeature, profilesReducer),
    EffectsModule.forFeature([SittersEffects, ProfilesEffects]),
  ]
})
export class ProfilesModule {
}
