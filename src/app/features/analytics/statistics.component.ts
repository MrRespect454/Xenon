import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    HeaderComponent
  ],
  template: `
     <app-header></app-header>

    <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h2 style="display: flex; align-items: center; gap: 10px;">
          <mat-icon style="color: #1976d2;">analytics</mat-icon>
          Статистика и аналитика
        </h2>
        <button mat-raised-button color="primary" (click)="refreshStats()">
          <mat-icon>refresh</mat-icon>
          Обновить
        </button>
      </div>

      <!-- Общая статистика -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <!-- Текущая серия -->
        <mat-card>
          <mat-card-content style="text-align: center; padding: 20px;">
            <mat-icon style="font-size: 48px; color: #4CAF50; margin-bottom: 10px;">whatshot</mat-icon>
            <h3 style="margin: 10px 0;">Текущая серия</h3>
            <div style="font-size: 48px; font-weight: bold; color: #4CAF50;">
              {{ overallStreak }}
            </div>
            <p style="color: #666;">дней подряд</p>
          </mat-card-content>
        </mat-card>

        <!-- Выполнение месяца -->
        <mat-card>
          <mat-card-content style="text-align: center; padding: 20px;">
            <mat-icon style="font-size: 48px; color: #2196F3; margin-bottom: 10px;">trending_up</mat-icon>
            <h3 style="margin: 10px 0;">Выполнение месяца</h3>
            <div style="font-size: 48px; font-weight: bold; color: #2196F3;">
              {{ monthlyCompletion }}%
            </div>
            <mat-progress-bar mode="determinate" [value]="monthlyCompletion" style="height: 10px; margin: 10px 0;"></mat-progress-bar>
            <p style="color: #666;">за {{ currentMonth }}</p>
          </mat-card-content>
        </mat-card>

        <!-- Активных привычек -->
        <mat-card>
          <mat-card-content style="text-align: center; padding: 20px;">
            <mat-icon style="font-size: 48px; color: #FF9800; margin-bottom: 10px;">star</mat-icon>
            <h3 style="margin: 10px 0;">Активных привычек</h3>
            <div style="font-size: 48px; font-weight: bold; color: #FF9800;">
              {{ habitsCount }}
            </div>
            <p style="color: #666;">всего привычек</p>
          </mat-card-content>
        </mat-card>

        <!-- Всего отметок -->
        <mat-card>
          <mat-card-content style="text-align: center; padding: 20px;">
            <mat-icon style="font-size: 48px; color: #9C27B0; margin-bottom: 10px;">calendar_month</mat-icon>
            <h3 style="margin: 10px 0;">Всего отметок</h3>
            <div style="font-size: 48px; font-weight: bold; color: #9C27B0;">
              {{ completedRecords }}
            </div>
            <p style="color: #666;">успешных дней</p>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Прогресс по неделям -->
      <mat-card style="margin-bottom: 30px;">
        <mat-card-content>
          <h3 style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
            <mat-icon>bar_chart</mat-icon>
            Прогресс по неделям ({{ currentMonth }})
          </h3>
          
          <div *ngIf="weeklyProgress.length === 0" style="text-align: center; padding: 40px;">
            <mat-icon style="font-size: 64px; color: #ccc; margin-bottom: 10px;">analytics</mat-icon>
            <p>Нет данных за этот месяц</p>
            <p style="color: #666;">Начните отмечать привычки в трекере</p>
          </div>

          <!-- ГРАФИК -->
          <div *ngIf="weeklyProgress.length > 0">
            <div style="display: flex; align-items: flex-end; height: 200px; gap: 15px; margin-top: 20px; padding: 0 20px;">
              <div *ngFor="let week of weeklyProgress; let i = index" 
                   style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                <div style="flex: 1; display: flex; align-items: flex-end; width: 100%; position: relative;">
                  <!-- Столбец графика -->
                  <div [style.height]="week + '%'" 
                       [style.background]="getProgressColor(week)"
                       style="width: 70%; border-radius: 4px 4px 0 0; transition: height 0.5s; min-height: 20px;">
                  </div>
                  <!-- Подпись процента над столбцом -->
                  <div style="position: absolute; top: -25px; left: 0; right: 0; text-align: center; font-weight: bold;">
                    {{ week }}%
                  </div>
                </div>
                <!-- Подпись недели -->
                <div style="margin-top: 10px; font-weight: 500;">Неделя {{ i + 1 }}</div>
              </div>
            </div>
            
            <!-- Легенда графика -->
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="width: 15px; height: 15px; background: #4CAF50; border-radius: 2px;"></div>
                <span>Отлично (80-100%)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="width: 15px; height: 15px; background: #8BC34A; border-radius: 2px;"></div>
                <span>Хорошо (60-80%)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="width: 15px; height: 15px; background: #FFC107; border-radius: 2px;"></div>
                <span>Средне (40-60%)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="width: 15px; height: 15px; background: #FF9800; border-radius: 2px;"></div>
                <span>Плохо (20-40%)</span>
              </div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <div style="width: 15px; height: 15px; background: #F44336; border-radius: 2px;"></div>
                <span>Очень плохо (0-20%)</span>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Статистика по привычкам -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px;">
        <!-- Пример привычки 1 -->
        <mat-card>
          <mat-card-content>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
              <div style="background: #4CAF50; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <mat-icon style="color: white; font-size: 20px;">fitness_center</mat-icon>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0;">Утренняя зарядка</h4>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">15 минут упражнений каждое утро</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 24px; font-weight: bold; color: #1976d2;">
                  7
                </div>
                <div style="font-size: 12px; color: #666;">дней подряд</div>
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666;">
              <span>Выполнено: 25 из 31 дней</span>
              <span>81%</span>
            </div>
            <mat-progress-bar mode="determinate" value="81" style="height: 6px; margin-top: 10px;"></mat-progress-bar>
          </mat-card-content>
        </mat-card>

        <!-- Пример привычки 2 -->
        <mat-card>
          <mat-card-content>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
              <div style="background: #2196F3; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <mat-icon style="color: white; font-size: 20px;">menu_book</mat-icon>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0;">Чтение книги</h4>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">30 минут чтения перед сном</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 24px; font-weight: bold; color: #1976d2;">
                  14
                </div>
                <div style="font-size: 12px; color: #666;">дней подряд</div>
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666;">
              <span>Выполнено: 28 из 31 дней</span>
              <span>90%</span>
            </div>
            <mat-progress-bar mode="determinate" value="90" style="height: 6px; margin-top: 10px;"></mat-progress-bar>
          </mat-card-content>
        </mat-card>

        <!-- Пример привычки 3 -->
        <mat-card>
          <mat-card-content>
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
              <div style="background: #FF9800; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <mat-icon style="color: white; font-size: 20px;">directions_walk</mat-icon>
              </div>
              <div style="flex: 1;">
                <h4 style="margin: 0;">Прогулка</h4>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">10 000 шагов в день</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 24px; font-weight: bold; color: #1976d2;">
                  3
                </div>
                <div style="font-size: 12px; color: #666;">дней подряд</div>
              </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666;">
              <span>Выполнено: 18 из 31 дней</span>
              <span>58%</span>
            </div>
            <mat-progress-bar mode="determinate" value="58" style="height: 6px; margin-top: 10px;"></mat-progress-bar>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Подсказка -->
      <div style="margin-top: 30px; padding: 20px; background: #FFF3E0; border-radius: 8px; border-left: 4px solid #FF9800;">
        <div style="display: flex; align-items: flex-start; gap: 15px;">
          <mat-icon style="color: #FF9800;">lightbulb</mat-icon>
          <div>
            <h4 style="margin: 0 0 10px 0;">Как улучшить статистику?</h4>
            <ul style="margin: 0; padding-left: 20px; color: #555;">
              <li>Создайте больше привычек на странице "Мои привычки"</li>
              <li>Регулярно отмечайте выполнение в "Трекере"</li>
              <li>Старайтесь не прерывать серии выполнения (streak)</li>
              <li>Установите реалистичные цели для каждой привычки</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    mat-card {
      transition: transform 0.2s;
    }
    mat-card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class StatisticsComponent implements OnInit {
  overallStreak = 7;
  monthlyCompletion = 78;
  habitsCount = 3;
  completedRecords = 71;
  weeklyProgress = [65, 78, 82, 75];
  
  currentMonth = new Date().toLocaleDateString('ru-RU', { 
    month: 'long', 
    year: 'numeric' 
  });

  ngOnInit() {
    // Загружаем данные из localStorage
    this.loadStatsFromStorage();
  }

  loadStatsFromStorage() {
    try {
      // Загружаем привычки
      const storedHabits = localStorage.getItem('xenon_habits');
      if (storedHabits) {
        const habits = JSON.parse(storedHabits);
        this.habitsCount = habits.length;
      }
      
      // Загружаем записи
      const storedRecords = localStorage.getItem('xenon_records');
      if (storedRecords) {
        const records = JSON.parse(storedRecords);
        this.completedRecords = records.filter((r: any) => r.isCompleted).length;
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  }

  refreshStats() {
    this.loadStatsFromStorage();
    
    // Обновляем график с новыми случайными данными для демонстрации
    this.weeklyProgress = [
      Math.floor(Math.random() * 30) + 60,
      Math.floor(Math.random() * 30) + 60,
      Math.floor(Math.random() * 30) + 60,
      Math.floor(Math.random() * 30) + 60
    ];
    
    this.overallStreak = Math.floor(Math.random() * 10) + 5;
    this.monthlyCompletion = Math.floor(Math.random() * 30) + 60;
    
    alert('Статистика обновлена!');
  }

  getProgressColor(percentage: number): string {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#8BC34A';
    if (percentage >= 40) return '#FFC107';
    if (percentage >= 20) return '#FF9800';
    return '#F44336';
  }
}
