import {Pipe, PipeTransform} from '@angular/core';
import {ContactInfo} from "../../api/src";

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(contact?: ContactInfo): string {
    if (contact?.city) {
      if (contact?.country) {
        return contact?.city + ", " + contact?.country;
      }
      return contact?.city;
    }
    return 'label.address.null';
  }

}
