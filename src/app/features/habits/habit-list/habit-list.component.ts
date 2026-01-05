import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Habit } from '../../../core/models/habit.model';
import { HabitService } from '../../../core/services/habit.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="content-container">
      <div class="page-header">
        <h2><mat-icon color="primary">checklist</mat-icon> Мои привычки</h2>
        <button mat-raised-button color="primary" routerLink="/habits/new">
          <mat-icon>add</mat-icon> Добавить привычку
        </button>
      </div>

      <div *ngIf="habits.length === 0" class="empty-state">
        <mat-icon>sentiment_dissatisfied</mat-icon>
        <p>У вас еще нет привычек. Создайте первую!</p>
      </div>

      <div class="habit-grid">
        <mat-card *ngFor="let habit of habits" [style.border-left]="'6px solid ' + habit.color">
          <mat-card-header>
            <mat-icon mat-card-avatar [style.color]="habit.color">{{habit.icon || 'star'}}</mat-icon>
            <mat-card-title>{{habit.name}}</mat-card-title>
            <mat-card-subtitle>{{habit.description}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="days-chips">
              <span *ngFor="let day of habit.targetDays" class="day-chip">
                {{ formatDay(day) }}
              </span>
            </div>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-icon-button color="warn" (click)="onDelete(habit.id)">
              <mat-icon>delete_outline</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .content-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .habit-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .day-chip { background: #f0f2f5; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; margin-right: 6px; color: #444; }
    .empty-state { text-align: center; padding: 100px; color: #999; }
    .empty-state mat-icon { font-size: 48px; width: 48px; height: 48px; }
  `]
})
export class HabitListComponent implements OnInit {
  private habitService = inject(HabitService);
  habits: Habit[] = [];

  // Словарь для мгновенного перевода
  private readonly dayTranslation: { [key: string]: string } = {
    'Mon': 'Пн', 'Tue': 'Вт', 'Wed': 'Ср', 'Thu': 'Чт', 'Fri': 'Пт', 'Sat': 'Сб', 'Sun': 'Вс',
    'monday': 'Пн', 'tuesday': 'Вт', 'wednesday': 'Ср', 'thursday': 'Чт', 'friday': 'Пт', 'saturday': 'Сб', 'sunday': 'Вс'
  };

  ngOnInit() {
    this.habitService.habits$.subscribe(res => this.habits = res);
  }

   formatDay(day: string): string {
    return this.dayTranslation[day] || day;
  }

  onDelete(id: string) {
    if (confirm('Удалить эту привычку навсегда?')) {
      this.habitService.deleteHabit(id);
    }
  }
}