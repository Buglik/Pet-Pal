import {Pipe, PipeTransform} from '@angular/core';
import {UserResponse} from "../../api/src";

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user?: UserResponse | null): string {
    return user ? user?.first_name + " " + user?.last_name : '';
  }

}
