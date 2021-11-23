import {Injectable} from '@angular/core';
import {PetExperienceEnum} from "../../api/src";

export class SelectOption<T> {
  value: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  private getPetsEnumSelectOptions<T>(enumInstance: T): SelectOption<string>[] {
    return Object.keys(enumInstance)
      // @ts-ignore
      .filter(key => typeof enumInstance[key] !== 'function')
      .map(key => {
        // @ts-ignore
        const value: string = enumInstance[key];
        return {value, key: 'label.pet.' + value};
      });
  }

  getPetsSelectOptions(): SelectOption<string>[] {
    return this.getPetsEnumSelectOptions(PetExperienceEnum);
  }
}
