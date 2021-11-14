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


@NgModule({
  declarations: [
    PetSittersComponent,
    BecomePetsitterComponent
  ],
    imports: [
        CommonModule,
        PetSittersRoutingModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TranslateModule
    ],
  exports: [PetSittersComponent]
})
export class PetSittersModule {
}
