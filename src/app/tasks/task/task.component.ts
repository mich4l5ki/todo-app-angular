import { Component, Input, inject } from '@angular/core';
import { Task } from './task.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../tasks.service';
import { DialogComponent } from '../../shared/dialog/dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input({ required: true}) task!: Task;
  readonly TaskEditDialog = inject(MatDialog)
  constructor(private tasksService: TasksService) {}

  onDeleteTask(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasksService.removeTask(this.task.id);
    }
  }

  onArchiveTask(): void {
    if (confirm('Are you sure you want to archive this task?')) {
      this.tasksService.archiveTask(this.task.id);
    }
  }

  onEditTaskDialog(): void {
    const dialogRef = this.TaskEditDialog.open(DialogComponent, {
      data: this.task
    });
  }

  onCompletedTask(): void {
    this.tasksService.changeCompletedStatus(this.task.id, this.task.completed);
  }
}
