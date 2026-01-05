import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HabitService } from '../../../core/services/habit.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule, MatIconModule],
  template: `
    <div [style.background]="(isDark$ | async) ? '#333' : 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'" 
         style="color: white; padding: 15px 20px; transition: background 0.3s;">
      <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 10px; cursor: pointer" [routerLink]="['/habits']">
          <mat-icon>psychology</mat-icon>
          <h1 style="margin: 0; font-size: 24px; font-weight: 500;">Xenon</h1>
        </div>
        
        <div style="display: flex; gap: 10px; align-items: center;">
          <button mat-icon-button (click)="toggleTheme()" style="color: white;">
            <mat-icon>{{ (isDark$ | async) ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>

          <button mat-button [routerLink]="['/habits']" routerLinkActive="active-link" style="color: white;">Привычки</button>
          <button mat-button [routerLink]="['/tracker']" routerLinkActive="active-link" style="color: white;">Трекер</button>
          <button mat-button [routerLink]="['/stats']" routerLinkActive="active-link" style="color: white;">Статистика</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .active-link { background: rgba(255,255,255,0.2); border-radius: 4px; }
  `]
})
export class HeaderComponent {
  private habitService = inject(HabitService);
  isDark$ = this.habitService.isDark$;

  toggleTheme() {
    this.habitService.toggleTheme();
  }
}