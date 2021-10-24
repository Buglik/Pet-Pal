import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetSittersComponent} from "./pet-sitters.component";


@NgModule({
  declarations: [
    PetSittersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PetSittersComponent]
})
export class PetSittersModule {
}
