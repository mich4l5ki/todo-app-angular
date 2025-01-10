import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('taskInput') taskInput!: ElementRef;
  private taskService = inject(TasksService)
  enteredTask = '';
  submitted: boolean = false;

  ngAfterViewInit(): void {
    this.taskInput.nativeElement.focus();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.enteredTask) {
      this.taskService.addTask(this.enteredTask);
      this.close.emit();
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
