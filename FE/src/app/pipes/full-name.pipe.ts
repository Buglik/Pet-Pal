import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../../api/src";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user?: User | null): string {
    return user ? user?.first_name + " " + user?.last_name : '';
  }

}
