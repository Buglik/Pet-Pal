import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetSittersComponent} from "./pet-sitters.component";
import {PetSittersRoutingModule} from "./pet-sitters-routing.module";


@NgModule({
  declarations: [
    PetSittersComponent
  ],
  imports: [
    CommonModule,
    PetSittersRoutingModule
  ],
  exports: [PetSittersComponent]
})
export class PetSittersModule {
}
