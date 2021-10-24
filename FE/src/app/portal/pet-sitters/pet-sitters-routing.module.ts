import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PetSittersComponent} from "./pet-sitters.component";


const routes: Routes = [
  {path: '', component: PetSittersComponent},
  {path: '**', redirectTo: ''}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PetSittersRoutingModule {
}
