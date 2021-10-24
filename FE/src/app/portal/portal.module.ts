import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalComponent} from './portal.component';
import {PortalRoutingModule} from "./portal-routing.module";
import {HeaderComponent} from './header/header.component';
import {HeaderLinksComponent} from './header/header-links/header-links.component';


@NgModule({
  declarations: [
    PortalComponent,
    HeaderComponent,
    HeaderLinksComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
