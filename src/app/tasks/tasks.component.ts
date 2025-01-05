import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from "./new-task/new-task.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [
    MatCardModule,
    MatButtonModule,
    TaskComponent,
    NewTaskComponent,
    NgClass
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  isAddingTask = false;

  constructor(private tasksService: TasksService) {}

  get tasks() {
    return this.tasksService.getTasks();
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
