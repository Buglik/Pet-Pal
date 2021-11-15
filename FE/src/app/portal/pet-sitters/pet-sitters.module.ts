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


@NgModule({
  declarations: [
    PetSittersComponent,
    BecomePetsitterComponent,
    ExperienceFormComponent,
    AvailabilityFormComponent,
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
    NgxDaterangepickerMd.forRoot()
  ],
  providers:[
    LocaleService
  ],
  exports: [PetSittersComponent]
})
export class PetSittersModule {
}
