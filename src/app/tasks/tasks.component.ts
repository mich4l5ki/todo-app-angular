import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import { TasksService } from './tasks.service';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from "./new-task/new-task.component";
import { NgClass } from '@angular/common';
import { Task } from './task/task.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [
    MatCardModule,
    MatButtonModule,
    TaskComponent,
    NewTaskComponent,
    NgClass,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  isAddingTask = false;
  public tasks$!: Observable<Task[]>;
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
      this.tasks$ = this.tasksService.tasks$;
  }

  onStartAddTask(): void {
    this.isAddingTask = true;
  }

  onCloseAddTask(): void {
    this.isAddingTask = false;
  }
}
