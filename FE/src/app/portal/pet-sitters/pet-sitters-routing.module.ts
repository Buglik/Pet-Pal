import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PetSittersComponent} from "./pet-sitters.component";
import {BecomePetsitterComponent} from "./become-petsitter/become-petsitter.component";
import {IsLoggedGuard} from "../../guards/is-logged.guard";


const routes: Routes = [
  {path: '', component: PetSittersComponent},
  {
    path: 'become-petsitter',
    canActivate: [IsLoggedGuard],
    component: BecomePetsitterComponent
  },
  {path: '**', redirectTo: ''}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PetSittersRoutingModule {
}
