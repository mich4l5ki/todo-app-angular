import { Component, inject, model } from '@angular/core';
import { Task } from '../../tasks/task/task.model';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { TasksService } from '../../tasks/tasks.service';
import { noSpecialCharactersValidator } from '../../validators/validators.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    NgIf
  ],
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<Task>(MAT_DIALOG_DATA);
  editTaskForm: FormGroup;

  constructor(private tasksService: TasksService, private fb: FormBuilder) {
      this.editTaskForm = this.fb.group({
        taskName: [this.data.taskName, [Validators.required, noSpecialCharactersValidator()]]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    if (this.editTaskForm.valid) {
      const updatedTaskName = this.editTaskForm.value.taskName;
      this.tasksService.editTask(this.data.id, updatedTaskName);
      this.dialogRef.close();
    }
  }
}
