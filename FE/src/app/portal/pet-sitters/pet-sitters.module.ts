import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetSittersComponent} from "./pet-sitters.component";
import {PetSittersRoutingModule} from "./pet-sitters-routing.module";
import {BecomePetsitterComponent} from './become-petsitter/become-petsitter.component';
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {ExperienceFormComponent} from './become-petsitter/experience-form/experience-form.component';
import {UtilsModule} from "../../utils/utils.module";
import {MatChipsModule} from "@angular/material/chips";
import {AvailabilityFormComponent} from "./become-petsitter/availability-form/availability-form.component";
import {LocaleService, NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {StepperSummaryComponent} from './become-petsitter/stepper-summary/stepper-summary.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {SitterPageComponent} from './sitter-page/sitter-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProfileInfoCardComponent} from './sitter-page/profile-info-card/profile-info-card.component';
import {SitterInfoComponent} from './sitter-page/sitter-info/sitter-info.component';
import {PipesModule} from "../../pipes/pipes.module";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    PetSittersComponent,
    BecomePetsitterComponent,
    ExperienceFormComponent,
    AvailabilityFormComponent,
    StepperSummaryComponent,
    SitterPageComponent,
    ProfileInfoCardComponent,
    SitterInfoComponent,
  ],
  imports: [
    CommonModule,
    PetSittersRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    UtilsModule,
    MatChipsModule,
    NgxDaterangepickerMd.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    PipesModule,
    MatDividerModule
  ],
  providers: [
    LocaleService,
  ],
  exports: [PetSittersComponent]
})
export class PetSittersModule {
}
