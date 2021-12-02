import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfilesComponent} from "./profiles.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {ProfileInitResolver} from "../../resolvers/profile-init.resolver";


const routes: Routes = [
  {path: '', component: ProfilesComponent},
  {
    path: 'user/:username',
    resolve: [ProfileInitResolver],
    component: ProfilePageComponent
  },
  {path: '**', redirectTo: ''}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfilesRoutingModule {
}
