import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsPageHeaderComponent} from './settings-page-header/settings-page-header.component';
import {PortalModule} from "../portal.module";
import {PipesModule} from "../../pipes/pipes.module";
import {SettingsNavigationComponent} from './settings-navigation/settings-navigation.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {MyProfileFormComponent} from './my-profile/my-profile-form/my-profile-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MyProfileAvatarComponent} from './my-profile/my-profile-avatar/my-profile-avatar.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProfileManagementService} from "./profile-management.service";
import {UtilsModule} from "../../utils/utils.module";
import {TranslateModule} from "@ngx-translate/core";
import {PetSitterSettingsComponent} from './pet-sitter-settings/pet-sitter-settings.component';
import {ContactInfoComponent} from './contact-info/contact-info.component';
import {ContactInfoFormComponent} from './contact-info/contact-info-form/contact-info-form.component';
import {PetSitterUpdateFormComponent} from './pet-sitter-settings/pet-sitter-update-form/pet-sitter-update-form.component';


@NgModule({
  declarations: [
    SettingsPageComponent,
    SettingsPageHeaderComponent,
    SettingsNavigationComponent,
    MyProfileComponent,
    MyProfileFormComponent,
    MyProfileAvatarComponent,
    PetSitterSettingsComponent,
    ContactInfoComponent,
    ContactInfoFormComponent,
    PetSitterUpdateFormComponent
  ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        PortalModule,
        PipesModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        UtilsModule,
        TranslateModule,
    ],
  providers: [
    FormBuilder,
    ProfileManagementService,
  ]
})
export class SettingsModule {
}
