import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InitialsPipe} from "./initials.pipe";
import {FullNamePipe} from './full-name.pipe';


@NgModule({
  declarations: [InitialsPipe, FullNamePipe],
  imports: [
    CommonModule
  ],
  exports: [InitialsPipe, FullNamePipe]
})
export class PipesModule {
}
