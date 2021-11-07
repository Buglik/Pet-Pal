import {AbstractControl, ValidatorFn} from "@angular/forms";

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn | null {
    if (controlName && checkControlName) {
      return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);

        if (control && checkControl) {
          if (checkControl.errors && !checkControl.errors.matching) {
            return null;
          }

          if (control.value !== checkControl.value) {
            // @ts-ignore
            controls.get(checkControlName).setErrors({matching: true});
            return {matching: true};
          } else {
            return null;
          }
        } else {
          return null
        }
      };
    } else {
      return null;
    }
  }
}
