import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks/task/task.model';
import { TasksService } from '../tasks/tasks.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-archived-tasks',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInputModule
  ],
  templateUrl: './archived-tasks.component.html',
  styleUrl: './archived-tasks.component.scss'
})
export class ArchivedTasksComponent {
  public tasks$!: Observable<Task[]>;
  constructor(private tasksService: TasksService) {}

  displayedColumns: string[] = ['task', 'completion', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);


  ngOnInit(): void {
      this.tasks$ = this.tasksService.tasks$;
      this.filterTasks();
  }

  onDeleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasksService.removeTask(task.id);
    }
  }

  onRestoreTask(task: Task): void {
    if (confirm('Are you sure you want to restore this task?')) {
      this.tasksService.restoreTask(task.id);
    }
    this.filterTasks();
  }

  filterTasks() {
    this.tasks$.subscribe(tasks => {
      const archivedTasks = tasks?.filter(task => task.archived === true) ?? [];
      this.dataSource.data = archivedTasks;
    });
  }
  
  applySearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
