import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserInitResolver} from "./resolvers/user-init.resolver";
import {IsNotLoggedGuard} from "./guards/is-not-logged.guard";

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [IsNotLoggedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    resolve: [UserInitResolver],
    loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule)
  },
  {path: '**', redirectTo: ''}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
