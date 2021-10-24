import {Pipe, PipeTransform} from '@angular/core';
import {MeResponse} from "../../api/src";

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(user?: MeResponse | null): string {
    return user ? user?.first_name[0] + user?.last_name[1] : '';
  }

}
