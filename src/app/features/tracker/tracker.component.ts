import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HabitRecord } from '../../core/models/habit-record.model';
import { Habit } from '../../core/models/habit.model';
import { HabitService } from '../../core/services/habit.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="tracker-page" style="padding: 20px; max-width: 800px; margin: 0 auto;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
        <h1 style="margin: 0;">Мой Прогресс</h1>
        
        <div style="display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.05); padding: 5px 15px; border-radius: 20px;">
          <button mat-icon-button (click)="changeMonth(-1)"><mat-icon>chevron_left</mat-icon></button>
          <span style="font-weight: 600; min-width: 120px; text-align: center; text-transform: capitalize;">
            {{ viewDate | date:'LLLL yyyy':'':'ru' }}
          </span>
          <button mat-icon-button (click)="changeMonth(1)"><mat-icon>chevron_right</mat-icon></button>
        </div>
      </div>

      <div style="margin-bottom: 25px;">
        <button mat-flat-button [matMenuTriggerFor]="habitMenu" 
                style="border-radius: 25px; padding: 0 20px; background: #1976d2; color: white;">
          <mat-icon>expand_more</mat-icon>
          {{ selectedHabitName || 'Выберите привычку' }}
        </button>
        <mat-menu #habitMenu="matMenu">
          <button mat-menu-item *ngFor="let h of habits" (click)="selectHabit(h)">
            <span [style.color]="h.color">●</span> {{ h.name }}
          </button>
        </mat-menu>
      </div>

      <div class="calendar-container" [style.background]="(isDark$ | async) ? '#2c2c2c' : 'white'"
           style="padding: 25px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; margin-bottom: 15px; font-weight: 700; color: #1976d2;">
          <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">
          <div *ngFor="let e of emptyDays"></div>
          <div *ngFor="let day of monthDays" 
               (click)="toggleDay(day)"
               [style.background]="isDone(day) ? selectedHabitColor : ((isDark$ | async) ? '#3d3d3d' : '#f5f5f5')"
               [style.color]="isDone(day) ? 'white' : 'inherit'"
               [style.opacity]="isFuture(day) ? '0.4' : '1'"
               [style.cursor]="isFuture(day) ? 'not-allowed' : 'pointer'"
               style="aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border-radius: 12px; font-weight: 600; transition: 0.2s;">
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class TrackerComponent implements OnInit {
  private habitService = inject(HabitService);
  isDark$ = this.habitService.isDark$;
  habits: Habit[] = [];
  records: HabitRecord[] = [];
  selectedHabitId: string | null = null;
  selectedHabitName: string = '';
  selectedHabitColor: string = '#1976d2';

  viewDate = new Date(); // Дата для отображения месяца
  monthDays: number[] = [];
  emptyDays: any[] = [];

  ngOnInit() {
    this.habitService.habits$.subscribe(h => {
      this.habits = h;
      if (h.length > 0 && !this.selectedHabitId) this.selectHabit(h[0]);
    });
    this.habitService.records$.subscribe(r => this.records = r);
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    
    const daysCount = new Date(year, month + 1, 0).getDate();
    this.monthDays = Array.from({ length: daysCount }, (_, i) => i + 1);
    
    let first = new Date(year, month, 1).getDay();
    first = (first === 0) ? 6 : first - 1;
    this.emptyDays = Array(first).fill(0);
  }

  changeMonth(delta: number) {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + delta, 1);
    this.generateCalendar();
  }

  isFuture(day: number): boolean {
    const d = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0,0,0,0);
    return d > today;
  }

  selectHabit(h: Habit) {
    this.selectedHabitId = h.id;
    this.selectedHabitName = h.name;
    this.selectedHabitColor = h.color;
  }

  toggleDay(day: number) {
    if (!this.selectedHabitId || this.isFuture(day)) return;
    
    const dateKey = `${this.viewDate.getFullYear()}-${(this.viewDate.getMonth()+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
    this.habitService.toggleCompletion(this.selectedHabitId, dateKey);
  }

  isDone(day: number): boolean {
    const dateKey = `${this.viewDate.getFullYear()}-${(this.viewDate.getMonth()+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
    return this.records.some(r => r.habitId === this.selectedHabitId && r.date === dateKey);
  }
}