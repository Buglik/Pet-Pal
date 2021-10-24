import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InitialsPipe} from "./initials.pipe";


@NgModule({
  declarations: [InitialsPipe],
  imports: [
    CommonModule
  ],
  exports: [InitialsPipe]
})
export class PipesModule {
}
