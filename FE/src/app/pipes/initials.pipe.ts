import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../../api/src";

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(user?: User | null): string {
    return user ? user?.first_name[0] + user?.last_name[1] : '';
  }

}
