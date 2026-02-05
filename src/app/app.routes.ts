import { Routes } from '@angular/router';
import { DynamicFormComponent } from './pages/dynamic-form/dynamic-form.component';
import { StopWatcherComponent } from './pages/stop-watcher/stop-watcher.component';

export const routes: Routes = [
    { path: '', redirectTo: 'stop-watcher', pathMatch: 'full' },
    { path: 'dynamic-form', component: DynamicFormComponent },
    { path: 'stop-watcher', component: StopWatcherComponent },
    { path: 'tic-tac-toe', loadComponent: () => import('./pages/tic-tac-toe/tic-tac-toe.component').then(m => m.TicTacToeComponent) },
    { path: '**', redirectTo: 'stop-watcher'  }
];
