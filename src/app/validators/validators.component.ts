import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable, of } from 'rxjs';

export function noSpecialCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regex = /[^a-zA-Z0-9 ]/;
    const invalid = regex.test(control.value);
    return invalid ? { specialCharacters: true } : null;
  };
}
