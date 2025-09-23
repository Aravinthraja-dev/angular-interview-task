import { Routes } from '@angular/router';
import { DynamicFormComponent } from './pages/dynamic-form/dynamic-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dynamic-form', pathMatch: 'full' },
    { path: 'dynamic-form', component: DynamicFormComponent },
    { path: '**', redirectTo: 'dynamic-form'  }
];
