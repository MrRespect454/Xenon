import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Habit } from '../../../core/models/habit.model';
import { DefaultHabitsService } from '../../../core/services/default-habits.service';
import { HabitService } from '../../../core/services/habit.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatIconModule,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    <div class="form-wrapper">
      <div class="habit-form-card" [class.dark]="(isDark$ | async)">
        <h1>Новая привычка</h1>
        
        <p class="label">Готовые идеи:</p>
        <div class="ideas-row">
          <button 
            type="button" 
            *ngFor="let idea of suggestedHabits" 
            (click)="applyIdea(idea)" 
            class="idea-chip">
            <mat-icon style="font-size: 16px; width: 16px; height: 16px;">{{idea.icon}}</mat-icon>
            {{idea.name}}
          </button>
        </div>

        <form [formGroup]="habitForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Название привычки</mat-label>
            <input matInput formControlName="name" placeholder="Напр: Утренняя йога">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Описание</mat-label>
            <textarea matInput formControlName="description" placeholder="Добавьте детали..."></textarea>
          </mat-form-field>

          <div class="color-row">
            <span>Цвет маркера:</span>
            <input type="color" formControlName="color" class="color-input">
          </div>

          <div class="days-container">
            <p class="label">Дни выполнения:</p>
            <div class="days-grid">
              <mat-checkbox formControlName="Пн">Пн</mat-checkbox>
              <mat-checkbox formControlName="Вт">Вт</mat-checkbox>
              <mat-checkbox formControlName="Ср">Ср</mat-checkbox>
              <mat-checkbox formControlName="Чт">Чт</mat-checkbox>
              <mat-checkbox formControlName="Пт">Пт</mat-checkbox>
              <mat-checkbox formControlName="Сб">Сб</mat-checkbox>
              <mat-checkbox formControlName="Вс">Вс</mat-checkbox>
            </div>
          </div>

          <div class="form-actions">
            <button mat-flat-button color="primary" type="submit" [disabled]="habitForm.invalid">
              Создать
            </button>
            <button mat-stroked-button type="button" (click)="onCancel()">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-wrapper { padding: 40px 20px; display: flex; justify-content: center; }
    .habit-form-card { 
      width: 100%; 
      max-width: 500px; 
      background: white; 
      padding: 30px; 
      border-radius: 24px; 
      box-shadow: 0 10px 40px rgba(0,0,0,0.08); 
    }
    .habit-form-card.dark { background: #2c2c2c; color: white; }
    h1 { font-size: 24px; margin-bottom: 20px; font-weight: 700; }
    .full-width { width: 100%; margin-bottom: 10px; }
    
    .ideas-row { 
      display: flex; 
      gap: 10px; 
      margin-bottom: 25px; 
      overflow-x: auto; 
      padding: 5px 0;
      scrollbar-width: thin;
    }
    .idea-chip { 
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 0 0 auto; 
      border: 1px solid #e0e0e0; 
      background: #fafafa; 
      border-radius: 12px; 
      padding: 8px 15px; 
      cursor: pointer; 
      font-size: 13px; 
      transition: all 0.2s;
    }
    .idea-chip:hover { background: #f0f0f0; border-color: #ccc; }
    .dark .idea-chip { background: #3d3d3d; border-color: #444; color: #ccc; }
    
    .label { font-weight: 600; font-size: 14px; margin-bottom: 8px; opacity: 0.8; }
    .color-row { display: flex; align-items: center; gap: 15px; margin: 15px 0; }
    .color-input { border: none; width: 40px; height: 40px; cursor: pointer; border-radius: 50%; padding: 0; background: none; }
    
    .days-grid { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 10px; 
      margin-bottom: 25px; 
    }
    .form-actions { display: flex; gap: 12px; }
    .form-actions button { flex: 1; height: 48px; border-radius: 14px; font-weight: 600; }
  `]
})
export class HabitFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private habitService = inject(HabitService);
  private defaultHabitsService = inject(DefaultHabitsService);

  isDark$ = this.habitService.isDark$;
  suggestedHabits: Omit<Habit, 'id' | 'creationDate'>[] = [];

  // Инициализируем форму с русскими ключами
  habitForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    color: ['#1976d2'],
    icon: ['circle'],
    'Пн': [false],
    'Вт': [false],
    'Ср': [false],
    'Чт': [false],
    'Пт': [false],
    'Сб': [false],
    'Вс': [false]
  });

  ngOnInit() {
    // Получаем 4 случайные идеи из вашего нового сервиса
    this.suggestedHabits = this.defaultHabitsService.getRandomHabits(4);
  }

  applyIdea(idea: Omit<Habit, 'id' | 'creationDate'>) {
    // 1. Сначала сбрасываем все дни в false
    const resetDays: any = {};
    ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].forEach(d => resetDays[d] = false);
    
    // 2. Устанавливаем дни из идеи
    if (idea.targetDays && Array.isArray(idea.targetDays)) {
      idea.targetDays.forEach(day => {
        if (resetDays.hasOwnProperty(day)) {
          resetDays[day] = true;
        }
      });
    }

    // 3. Патчим форму данными из DefaultHabitsService
    this.habitForm.patchValue({
      name: idea.name,
      description: idea.description,
      color: idea.color,
      icon: idea.icon || 'circle',
      ...resetDays
    });
  }

  onSubmit() {
    if (this.habitForm.valid) {
      const val = this.habitForm.getRawValue();
      const allDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      
      // Собираем массив строк ["Пн", "Ср"] на основе выбранных чекбоксов
      const selectedDays = allDays.filter(day => (val as any)[day] === true);

      const newHabit: Habit = {
        id: Date.now().toString(),
        name: val.name!,
        description: val.description || '',
        color: val.color || '#1976d2',
        icon: val.icon || 'circle',
        targetDays: selectedDays,
        creationDate: new Date()
      };

      this.habitService.addHabit(newHabit);
      this.router.navigate(['/habits']);
    }
  }

  onCancel() {
    this.router.navigate(['/habits']);
  }
}