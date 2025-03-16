import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    const valid = regex.test(control.value);
    return valid ? { noSpecialCharacters: true } : null;
  };
}
