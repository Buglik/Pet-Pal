import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfilesComponent} from './profiles.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {ProfilesRoutingModule} from "./profiles-routing.module";
import {ProfileListComponent} from './profile-list/profile-list.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {profileListFeature} from "../../state/app.state";
import {EffectsModule} from "@ngrx/effects";
import {profilesReducer} from "../../state/profiles/profiles.reducer";
import {ProfilesEffects} from "../../state/profiles/profiles.effects";
import {UtilsModule} from "../../utils/utils.module";
import {ProfileListItemComponent} from './profile-list/profile-list-item/profile-list-item.component';
import {PortalModule} from "../portal.module";
import {BarRatingModule} from "ngx-bar-rating";
import {PipesModule} from "../../pipes/pipes.module";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PetSittersModule} from "../pet-sitters/pet-sitters.module";
import {ProfileInfoCardComponent} from './profile-page/profile-info-card/profile-info-card.component';
import {MatDividerModule} from "@angular/material/divider";
import {BannerModule} from "../../utils/banner/banner.module";


@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilePageComponent,
    ProfileListComponent,
    ProfileListItemComponent,
    ProfileInfoCardComponent
  ],
    imports: [
        CommonModule,
        ProfilesRoutingModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        StoreModule.forFeature(profileListFeature, profilesReducer),
        EffectsModule.forFeature([ProfilesEffects]),
        UtilsModule,
        PortalModule,
        BarRatingModule,
        PipesModule,
        MatIconModule,
        TranslateModule,
        MatProgressSpinnerModule,
        PetSittersModule,
        MatDividerModule,
        BannerModule,
    ]
})
export class ProfilesModule {
}
