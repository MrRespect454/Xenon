import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div style="background: linear-gradient(135deg, #1976d2 0%, #2196f3 100%); color: white; padding: 15px 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <mat-icon style="color: white;">psychology</mat-icon>
          <h1 style="margin: 0; font-size: 24px; font-weight: 500;">Xenon</h1>
        </div>
        
        <div style="display: flex; gap: 10px;">
          <button mat-raised-button [routerLink]="['/habits']" 
                  style="background: rgba(255,255,255,0.2); color: white;">
            <mat-icon>list</mat-icon>
            Мои привычки
          </button>
          
          <button mat-raised-button [routerLink]="['/tracker']" 
                  style="background: rgba(255,255,255,0.2); color: white;">
            <mat-icon>calendar_today</mat-icon>
            Трекер
          </button>
          
          <button mat-raised-button [routerLink]="['/stats']" 
                  style="background: rgba(255,255,255,0.2); color: white;">
            <mat-icon>bar_chart</mat-icon>
            Статистика
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HeaderComponent {}
