import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor() {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  private tasks = [
    {
      id: 't1',
      taskName: 'master angular',
      completed: false
    },
    {
      id: 't2',
      taskName: 'vacuum',
      completed: true
    }
  ];

  getTasks() {
    return this.tasks
  }

  addTask(taskInput: string) {
    this.tasks.push({
      id: new Date().getTime.toString(),
      taskName: taskInput,
      completed: false
    });
    this.saveTasks()
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  changeCompletedStatus(id: string, completed: boolean) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = completed;  // Toggle the 'completed' value
      console.log(`Task with id ${id} is now ${task.completed ? 'completed' : 'not completed'}`);
    }
    this.saveTasks();
  }
}
