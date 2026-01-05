import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'habits',
    loadComponent: () => import('./features/habits/habit-list/habit-list.component').then(m => m.HabitListComponent)
  },
  {
    path: 'habits/new',
    loadComponent: () => import('./features/habits/habit-form/habit-form.component').then(m => m.HabitFormComponent)
  },
  {
    path: 'tracker',
    loadComponent: () => import('./features/tracker/tracker.component').then(m => m.TrackerComponent)
  },
  {
  path: 'habits/new',
  loadComponent: () => import('./features/habits/habit-form/habit-form.component').then(m => m.HabitFormComponent)
  },
  {
    path: 'stats',
    loadComponent: () => import('./features/analytics/statistics.component').then(m => m.StatisticsComponent)
  },
  { path: '', redirectTo: '/habits', pathMatch: 'full' },
  { path: '**', redirectTo: '/habits' }
];