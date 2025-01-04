import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule, MatButtonModule, TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  constructor(private tasksService: TasksService) {}

  get tasks() {
    return this.tasksService.getTasks();
  }
}
