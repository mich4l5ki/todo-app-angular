import { Component, Input } from '@angular/core';
import { Task } from './task.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TasksService } from '../tasks.service';


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
  constructor(private tasksService: TasksService) {}

  onDeleteTask() {
    if (confirm('Are you sure you want to delete this task?')) {
      return this.tasksService.removeTask(this.task.id);
    }
  }

  onCompletedTask() {
    return this.tasksService.changeCompletedStatus(this.task.id, this.task.completed);
  }
}
