import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InitialsPipe} from "./initials.pipe";
import {FullNamePipe} from './full-name.pipe';
import {AddressPipe} from './address.pipe';


@NgModule({
  declarations: [InitialsPipe, FullNamePipe, AddressPipe],
  imports: [
    CommonModule
  ],
    exports: [InitialsPipe, FullNamePipe, AddressPipe]
})
export class PipesModule {
}
