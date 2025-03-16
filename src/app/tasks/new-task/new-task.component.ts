import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Validators } from '@angular/forms';
import { noSpecialCharactersValidator } from '../../validators/validators.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('taskInput') taskInput!: ElementRef;
  private taskService = inject(TasksService)
  enteredTask: string = '';
  submitted: boolean = false;
  newTaskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newTaskForm = this.fb.group({
      enteredTask: ['', [Validators.required, noSpecialCharactersValidator()]]
    });
  }

  ngAfterViewInit(): void {
    this.taskInput.nativeElement.focus();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.newTaskForm.valid) {
      const taskValue = this.newTaskForm.get('enteredTask')?.value.trim();
      if (taskValue) {
        this.taskService.addTask(taskValue);
        this.close.emit();
      }
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
