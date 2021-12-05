import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from "./home-page.component";
import {HomePageRoutingModule} from "./home-page-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {UtilsModule} from "../../utils/utils.module";


@NgModule({
  declarations: [
    HomePageComponent
  ],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        TranslateModule,
        UtilsModule
    ],
  exports: [HomePageComponent]
})
export class HomePageModule {
}
