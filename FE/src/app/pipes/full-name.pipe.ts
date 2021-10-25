import {Pipe, PipeTransform} from '@angular/core';
import {MeResponse} from "../../api/src";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user?: MeResponse | null): string {
    return user ? user?.first_name + " " + user?.last_name : '';
  }

}
