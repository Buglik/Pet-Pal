import {Pipe, PipeTransform} from '@angular/core';
import {UserResponse} from "../../api/src";

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(user?: UserResponse | null): string {
    return user ? user?.first_name[0] + user?.last_name[0] : '';
  }

}
