import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalComponent} from './portal.component';
import {PortalRoutingModule} from "./portal-routing.module";
import {HeaderComponent} from './header/header.component';
import {HeaderLinksComponent} from './header/header-links/header-links.component';
import {HeaderAvatarComponent} from './header/header-avatar/header-avatar.component';
import {HeaderAvatarMenuComponent} from './header/header-avatar-menu/header-avatar-menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {PipesModule} from "../pipes/pipes.module";


@NgModule({
    declarations: [
        PortalComponent,
        HeaderComponent,
        HeaderLinksComponent,
        HeaderAvatarComponent,
        HeaderAvatarMenuComponent,
    ],
    exports: [
        HeaderAvatarComponent
    ],
    imports: [
        CommonModule,
        PortalRoutingModule,
        MatMenuModule,
        MatDividerModule,
        MatIconModule,
        PipesModule
    ]
})
export class PortalModule { }