import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { combineLatest } from 'rxjs';
import { HabitService } from '../../core/services/habit.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div style="padding: 20px; max-width: 900px; margin: 0 auto;" [class.dark]="(isDark$ | async)">
      <h2 style="display: flex; align-items: center; gap: 10px;">
        <mat-icon color="primary">insights</mat-icon> Статистика достижений
      </h2>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <mat-card style="padding: 20px; text-align: center;">
          <h3 style="margin: 0; color: #1976d2; font-size: 32px;">{{maxStreak}}</h3>
          <small>Лучшая серия (дней)</small>
        </mat-card>
        <mat-card style="padding: 20px; text-align: center;">
          <h3 style="margin: 0; color: #4CAF50; font-size: 32px;">{{totalCompletions}}</h3>
          <small>Всего выполнено</small>
        </mat-card>
      </div>

      <mat-card style="padding: 20px; margin-bottom: 25px;">
        <h3 style="color: #9c27b0;">Прогресс за неделю</h3>
        <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 150px; padding-top: 20px;">
          <div *ngFor="let day of weekStats" style="display: flex; flex-direction: column; align-items: center; flex: 1;">
            <div [style.height.px]="day.count * 30" 
                 style="width: 70%; background: #2196f3; border-radius: 8px 8px 0 0; min-height: 5px; transition: height 0.3s;">
            </div>
            <span style="font-size: 12px; margin-top: 8px; font-weight: bold;">{{day.label}}</span>
          </div>
        </div>
      </mat-card>

      <mat-card style="padding: 20px;">
        <h3 style="color: #9c27b0; margin-bottom: 20px;">Детализация привычек</h3>
        <div *ngFor="let h of habitDetails" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div [style.background]="h.color" style="width: 12px; height: 12px; border-radius: 50%;"></div>
            <span style="font-weight: 500;">{{h.name}}</span>
          </div>
          <span style="color: #666;">Серия: <strong>{{h.streak}} дн.</strong></span>
        </div>
      </mat-card>
    </div>
  `
})
export class StatisticsComponent implements OnInit {
  private habitService = inject(HabitService);
  isDark$ = this.habitService.isDark$;

  totalCompletions = 0;
  maxStreak = 0;
  habitDetails: any[] = [];
  weekStats: any[] = [];

  ngOnInit() {
    combineLatest([this.habitService.habits$, this.habitService.records$])
      .subscribe(([habits, records]) => {
        this.totalCompletions = records.length;
        this.calculateStats(habits, records);
      });
  }

  private calculateStats(habits: any[], records: any[]) {
    this.habitDetails = habits.map(h => ({
      name: h.name,
      color: h.color,
      streak: this.habitService.getStreak(h.id) 
    }));

    this.maxStreak = this.habitDetails.length > 0 
      ? Math.max(...this.habitDetails.map(d => d.streak)) 
      : 0;

    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = records.filter(r => r.date === dateStr).length;
      
      last7Days.push({
        label: days[d.getDay()],
        count: count
      });
    }
    this.weekStats = last7Days;
  }
}