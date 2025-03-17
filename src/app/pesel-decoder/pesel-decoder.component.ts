import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeselService } from './pesel.service';
import { DatePipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pesel-decoder',
  imports: [
    MatCardModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    ReactiveFormsModule,
    NgIf,
    DatePipe,
    MatCardActions
  ],
  templateUrl: './pesel-decoder.component.html',
  styleUrl: './pesel-decoder.component.scss'
})
export class PeselDecoderComponent {
  peselDecoderForm: FormGroup;
  gender: string | null = null;
  birthDate: Date | null = null;

  constructor(private fb: FormBuilder, private peselService: PeselService) {
    this.peselDecoderForm = this.fb.group({
      pesel: this.fb.control('', {validators: [Validators.required], asyncValidators: [peselService.peselAsyncValidator()]})
    });
  }

  onSubmit() {
    if (this.peselDecoderForm.valid) {
      const pesel = this.peselDecoderForm.value.pesel;
      this.gender = this.peselService.checkGender(pesel);
      this.birthDate = this.peselService.isValidDate(pesel) as Date;
    }
  }

}
