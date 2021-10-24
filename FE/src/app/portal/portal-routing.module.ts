import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortalComponent} from "./portal.component";

const childRoutes: Routes = [
  {path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'pet-sitters', loadChildren: () => import('./pet-sitters/pet-sitters.module').then(m => m.PetSittersModule)},
  {path: '**', redirectTo: 'home'}
]

const routes: Routes = [
  {path: '', component: PortalComponent, children: childRoutes},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalRoutingModule {
}
