import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <h2>Трекер привычек</h2>
      
      <!-- Навигация по месяцам -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
        <button mat-raised-button>
          <mat-icon>chevron_left</mat-icon>
          Предыдущий месяц
        </button>
        
        <div style="text-align: center;">
          <h3 style="margin: 0; color: #1976d2;">Январь 2024</h3>
          <small style="color: #666;">Сегодня: {{ getTodayDate() }}</small>
        </div>
        
        <button mat-raised-button>
          Следующий месяц
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; background: #f0f0f0; padding: 2px; border-radius: 8px;">
        <div *ngFor="let day of weekDays" style="padding: 15px; text-align: center; font-weight: bold; background: white; border-radius: 4px;">
          {{ day }}
        </div>
        <div *ngFor="let day of getDaysArray()" 
             style="padding: 15px; min-height: 80px; background: white; border-radius: 4px; cursor: pointer; transition: all 0.2s;"
             [style.background]="getDayColor(day)"
             [style.box-shadow]="isToday(day) ? '0 0 0 2px #1976d2' : 'none'"
             class="day-cell">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span [style.font-weight]="isToday(day) ? 'bold' : 'normal'">{{ day }}</span>
            <mat-icon *ngIf="isCompleted(day)" style="color: #4CAF50; font-size: 18px;">check_circle</mat-icon>
          </div>
          
          <!-- Простые индикаторы -->
          <div style="display: flex; gap: 4px; margin-top: 8px; justify-content: center;">
            <div *ngFor="let i of [1,2,3]" 
                 [style.background]="getIndicatorColor(day, i)"
                 style="width: 12px; height: 12px; border-radius: 50%;">
            </div>
          </div>
        </div>
      </div>

      <!-- Легенда -->
      <div style="margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
        <h4>Легенда:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; background: #E3F2FD; border-radius: 4px;"></div>
            <span>Сегодняшний день</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <mat-icon style="color: #4CAF50;">check_circle</mat-icon>
            <span>Все привычки выполнены</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; background: #4CAF50; border-radius: 50%;"></div>
            <span>Привычка выполнена</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 20px; height: 20px; background: #FF9800; border-radius: 50%;"></div>
            <span>Часть привычек выполнена</span>
          </div>
        </div>
      </div>

      <!-- Информация -->
      <div style="margin-top: 20px; padding: 15px; background: #E3F2FD; border-radius: 8px; border-left: 4px solid #1976d2;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <mat-icon>info</mat-icon>
          <div>
            <strong>Трекер привычек</strong>
            <p style="margin: 5px 0 0 0; color: #555;">
              Календарь показывает выполнение привычек. Кликните на день, чтобы отметить выполнение.
              В реальном приложении здесь будет подключение к HabitService и диалог для отметки.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .day-cell:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class TrackerComponent {
  weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  // Примеры выполненных дней для демонстрации
  completedDays = [5, 10, 15, 20, 25];
  partiallyCompletedDays = [3, 8, 12, 18, 22];
  
  getDaysArray(): number[] {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }
  
  getTodayDate(): string {
    const today = new Date();
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  }
  
  isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === 0; // Январь
  }
  
  isCompleted(day: number): boolean {
    return this.completedDays.includes(day);
  }
  
  getDayColor(day: number): string {
    if (this.completedDays.includes(day)) return '#E8F5E9'; // Зеленый
    if (this.partiallyCompletedDays.includes(day)) return '#FFF3E0'; // Оранжевый
    if (this.isToday(day)) return '#E3F2FD'; // Синий
    return '#ffffff';
  }
  
  getIndicatorColor(day: number, index: number): string {
    if (this.completedDays.includes(day)) {
      return ['#4CAF50', '#4CAF50', '#4CAF50'][index - 1]; // Все зеленые
    }
    if (this.partiallyCompletedDays.includes(day)) {
      return ['#4CAF50', '#FF9800', '#F44336'][index - 1]; // Смешанные
    }
    return '#e0e0e0'; // Серые
  }
}