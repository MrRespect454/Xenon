import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    RouterLink,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    
    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="display: flex; align-items: center; gap: 10px;">
          <mat-icon style="color: #1976d2;">checklist</mat-icon>
          Мои привычки
        </h2>
        <button mat-raised-button color="primary" routerLink="/habits/new">
          <mat-icon>add</mat-icon>
          Добавить привычку
        </button>
      </div>
      
      <!-- Сообщение если нет привычек -->
      <div *ngIf="habits.length === 0" style="text-align: center; padding: 60px 20px; background: #f9f9f9; border-radius: 12px; margin: 20px 0;">
        <mat-icon style="font-size: 72px; color: #ccc; margin-bottom: 20px;">add_task</mat-icon>
        <h3 style="color: #666; margin-bottom: 10px;">Нет привычек</h3>
        <p style="color: #888; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
          Начните формировать полезные привычки. Создайте свою первую привычку, чтобы начать отслеживать прогресс.
        </p>
        <button mat-raised-button color="primary" routerLink="/habits/new" style="padding: 10px 30px;">
          <mat-icon>add_circle</mat-icon>
          Создать первую привычку
        </button>
      </div>

      <!-- Список привычек -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; margin-top: 20px;">
        <mat-card *ngFor="let habit of habits" [style.border-left]="'5px solid ' + habit.color" style="transition: all 0.3s;">
          <mat-card-content>
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <div style="flex: 1;">
                <!-- Заголовок с цветным маркером -->
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
                  <div [style.background]="habit.color" style="width: 12px; height: 12px; border-radius: 50%;"></div>
                  <h3 style="margin: 0; font-size: 18px;">{{ habit.name }}</h3>
                </div>
                
                <!-- Описание -->
                <p style="color: #666; margin: 8px 0; line-height: 1.5;">
                  {{ habit.description || 'Описание не добавлено' }}
                </p>
                
                <!-- Дни выполнения -->
                <div style="margin-top: 15px;">
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <mat-icon style="font-size: 18px; color: #666;">event</mat-icon>
                    <span style="font-size: 14px; color: #666;">Выполняется:</span>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    <span *ngFor="let day of getDaysArray(habit.targetDays)" 
                          style="padding: 4px 12px; background: #f0f0f0; border-radius: 16px; font-size: 13px;">
                      {{ day }}
                    </span>
                  </div>
                </div>
                
                <!-- Дата создания -->
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; color: #888; font-size: 13px;">
                  Создано: {{ formatDate(habit.creationDate) }}
                </div>
              </div>
              
              <!-- Кнопка удаления -->
              <button mat-icon-button color="warn" (click)="deleteHabit(habit.id)" 
                      style="margin-left: 10px;" matTooltip="Удалить привычку">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    mat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
    }
  `]
})
export class HabitListComponent implements OnInit {
  habits: any[] = [];

  ngOnInit() {
    this.loadHabits();
  }

  loadHabits() {
    try {
      const storedHabits = localStorage.getItem('xenon_habits');
      if (storedHabits) {
        this.habits = JSON.parse(storedHabits);
      } else {
        // Демо данные для первого запуска
        this.habits = [
          { 
            id: '1', 
            name: 'Утренняя зарядка', 
            description: '15 минут упражнений каждое утро',
            color: '#4CAF50',
            targetDays: ['Mon', 'Wed', 'Fri'],
            creationDate: new Date('2024-12-01').toISOString()
          },
          { 
            id: '2', 
            name: 'Чтение книги', 
            description: '30 минут чтения перед сном',
            color: '#2196F3',
            targetDays: ['daily'],
            creationDate: new Date('2024-12-05').toISOString()
          }
        ];
        this.saveHabits();
      }
    } catch (error) {
      console.error('Ошибка загрузки привычек:', error);
    }
  }

  saveHabits() {
    try {
      localStorage.setItem('xenon_habits', JSON.stringify(this.habits));
    } catch (error) {
      console.error('Ошибка сохранения привычек:', error);
    }
  }

  deleteHabit(id: string) {
    if (confirm('Удалить эту привычку?')) {
      this.habits = this.habits.filter(h => h.id !== id);
      this.saveHabits();
    }
  }

  getDaysArray(targetDays: string[]): string[] {
    if (targetDays.includes('daily')) {
      return ['Ежедневно'];
    }
    
    const dayMap: {[key: string]: string} = {
      'Mon': 'Пн', 'Tue': 'Вт', 'Wed': 'Ср', 'Thu': 'Чт',
      'Fri': 'Пт', 'Sat': 'Сб', 'Sun': 'Вс'
    };
    
    return targetDays.map(day => dayMap[day] || day);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}