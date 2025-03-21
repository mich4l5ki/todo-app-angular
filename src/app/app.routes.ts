import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { PeselDecoderComponent } from './pesel-decoder/pesel-decoder.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/active-tasks',
        pathMatch: "full"
    },
    {
        path: 'active-tasks', // <your-domain>/active-tasks
        component: TasksComponent
    },
    {
        path: 'archived-tasks', // <your-domain>/archived-tasks
        component: ArchivedTasksComponent
    },
    {
        path: 'pesel-decoder', // <your-domain>/pesel-decoder TODO
        component: PeselDecoderComponent
    },
];
