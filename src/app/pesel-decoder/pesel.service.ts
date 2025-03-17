import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeselService {

  isValidDate(pesel: string): Date | false {
    const dateString = pesel.substring(0, 6)
    const year = parseInt(dateString.substring(0, 2), 10);
    const month = parseInt(dateString.substring(2, 4), 10);
    const day = parseInt(dateString.substring(4, 6), 10);

    let fullYear;
    let adjustedMonth;

    if (month >= 1 && month <= 12) {
      fullYear = 1900 + year;
      adjustedMonth = month - 1;
    } else if (month >= 21 && month <= 32) {
      fullYear = 2000 + year;
      adjustedMonth = month - 21;
    } else {
      return false;
    }

    const date = new Date(fullYear, adjustedMonth, day);

    if (date.getFullYear() === fullYear && date.getMonth() === adjustedMonth && date.getDate() === day) {
      return date;
    }

    return false;
  }

  checkGender(pesel: string): string {
    return parseInt(pesel[9], 10) % 2 ? "Male" : "Female";
  }

  checkControlNumber(pesel: string): boolean {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let controlNumber = this.calculateControlNumber(weights, pesel);
    console.log(controlNumber)
    return parseInt(pesel[10]) === controlNumber;

  }

  calculateControlNumber(weights: number[], pesel: string) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += (parseInt(pesel[i]) * weights[i]) % 10;
    }

    return (10 - (sum % 10)) % 10;

  }

  peselAsyncValidator() : AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const pesel = control.value;

      if (!pesel || pesel.length !== 11 || !/^\d+$/.test(pesel)) {
        return of({ invalidLength: true });
      }

      if (!this.isValidDate(pesel)) {
        return of({ invalidDate: true });
      }

      if (!this.checkControlNumber(pesel)) {
        return of({ invalidChecksum: true });
      }

      return of(null).pipe(delay(5000))
    }
  }
}
