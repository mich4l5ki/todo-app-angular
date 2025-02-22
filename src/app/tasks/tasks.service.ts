import { Injectable } from '@angular/core';
import { Task } from './task/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      this.tasksSubject.next(JSON.parse(tasks));
      this.saveTasks()
    }
    else {
      this.saveTasks()
    }
  }
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: 't1',
      taskName: 'Example task',
      completed: false
    },
    {
      id: 't2',
      taskName: 'Example completed task',
      completed: true
    }
  ])
  tasks$ = this.tasksSubject.asObservable();

  addTask(taskInput: string): void {
    this.tasksSubject.next([...this.tasksSubject.getValue(), {
      id: new Date().getTime().toString(),
      taskName: taskInput,
      completed: false
    }]);
    this.saveTasks()
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSubject.getValue()))
  }

  removeTask(id: string): void {
    const updatedTasks = this.tasksSubject.getValue().filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
    this.saveTasks();
  }

  changeCompletedStatus(id: string, completed: boolean): void {
    const updatedTask = this.tasksSubject.getValue().find((task) => task.id === id);
    if (updatedTask) {
      updatedTask.completed = completed;
    }
    this.saveTasks();
  }
}
