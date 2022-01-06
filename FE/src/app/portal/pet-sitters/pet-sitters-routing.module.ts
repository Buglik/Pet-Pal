import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PetSittersComponent} from "./pet-sitters.component";
import {BecomePetsitterComponent} from "./become-petsitter/become-petsitter.component";
import {IsLoggedGuard} from "../../guards/is-logged.guard";
import {SitterPageComponent} from "./sitter-page/sitter-page.component";
import {SitterInitResolver} from "../../resolvers/sitter-init.resolver";
import {IsPetsitterGuard} from "../../guards/is-petsitter.guard";


const routes: Routes = [
  {path: '', component: PetSittersComponent},
  {
    path: 'sitter/:username',
    resolve: [SitterInitResolver],
    component: SitterPageComponent
  },
  {
    path: 'become-sitter',
    canActivate: [IsLoggedGuard, IsPetsitterGuard],
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
