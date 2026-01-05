import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterLink,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    
    <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
      <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
        <h2 style="display: flex; align-items: center; gap: 10px; margin-bottom: 30px; color: #1976d2;">
          <mat-icon>add_circle</mat-icon>
          Новая привычка
        </h2>
        
        <form [formGroup]="habitForm" (ngSubmit)="onSubmit()">
          <!-- Название привычки -->
          <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 20px;">
            <mat-label>Название привычки *</mat-label>
            <input matInput formControlName="name" placeholder="Например: Утренняя зарядка" required>
            <mat-icon matPrefix style="color: #666;">title</mat-icon>
            <mat-error *ngIf="habitForm.get('name')?.hasError('required')">
              Название обязательно
            </mat-error>
            <mat-error *ngIf="habitForm.get('name')?.hasError('minlength')">
              Минимум 3 символа
            </mat-error>
          </mat-form-field>

          <!-- Описание -->
          <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 20px;">
            <mat-label>Описание (необязательно)</mat-label>
            <textarea matInput formControlName="description" rows="3" 
                      placeholder="Опишите вашу привычку, почему она важна, как ее выполнять..."></textarea>
            <mat-icon matPrefix style="color: #666;">description</mat-icon>
          </mat-form-field>

          <!-- Цвет -->
          <div style="margin-bottom: 30px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #444;">Цвет привычки</label>
            <mat-form-field appearance="outline" style="width: 100%;">
              <mat-select formControlName="color">
                <mat-option value="#4CAF50">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 20px; height: 20px; background: #4CAF50; border-radius: 4px;"></div>
                    <span>Зеленый (спорт, здоровье)</span>
                  </div>
                </mat-option>
                <mat-option value="#2196F3">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 20px; height: 20px; background: #2196F3; border-radius: 4px;"></div>
                    <span>Синий (развитие, учеба)</span>
                  </div>
                </mat-option>
                <mat-option value="#FF9800">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 20px; height: 20px; background: #FF9800; border-radius: 4px;"></div>
                    <span>Оранжевый (творчество, хобби)</span>
                  </div>
                </mat-option>
                <mat-option value="#9C27B0">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 20px; height: 20px; background: #9C27B0; border-radius: 4px;"></div>
                    <span>Фиолетовый (медитация, отдых)</span>
                  </div>
                </mat-option>
              </mat-select>
              <mat-icon matPrefix style="color: #666;">palette</mat-icon>
            </mat-form-field>
          </div>

          <!-- Дни недели -->
          <div style="margin-bottom: 30px;">
            <label style="display: block; margin-bottom: 15px; font-weight: 500; color: #444;">
              <mat-icon style="vertical-align: middle; margin-right: 8px;">event</mat-icon>
              Дни выполнения
            </label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
              <mat-checkbox formControlName="monday" style="margin: 0;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>looks_one</mat-icon>
                  Понедельник
                </div>
              </mat-checkbox>
              <mat-checkbox formControlName="tuesday">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>looks_two</mat-icon>
                  Вторник
                </div>
              </mat-checkbox>
              <mat-checkbox formControlName="wednesday">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>looks_3</mat-icon>
                  Среда
                </div>
              </mat-checkbox>
              <mat-checkbox formControlName="thursday">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>looks_4</mat-icon>
                  Четверг
                </div>
              </mat-checkbox>
              <mat-checkbox formControlName="friday">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>looks_5</mat-icon>
                  Пятница
                </div>
              </mat-checkbox>
              <mat-checkbox formControlName="saturday">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>looks_6</mat-icon>
                  Суббота
                </div>
              </mat-checkbox>
              <mat-checkbox formControlName="sunday">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <mat-icon>weekend</mat-icon>
                  Воскресенье
                </div>
              </mat-checkbox>
            </div>
          </div>

          <!-- Кнопки -->
          <div style="display: flex; gap: 15px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <button mat-raised-button color="primary" type="submit" [disabled]="!habitForm.valid" 
                    style="flex: 1; padding: 12px;">
              <mat-icon>check_circle</mat-icon>
              Создать привычку
            </button>
            <button mat-stroked-button type="button" routerLink="/habits" style="flex: 1; padding: 12px;">
              <mat-icon>close</mat-icon>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class HabitFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  habitForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    color: ['#4CAF50'],
    monday: [true],
    tuesday: [true],
    wednesday: [true],
    thursday: [true],
    friday: [true],
    saturday: [false],
    sunday: [false]
  });

  onSubmit() {
    if (this.habitForm.valid) {
      const formValue = this.habitForm.value;
      
      // Собираем дни недели
      const targetDays: string[] = [];
      const dayMap = {
        monday: 'Mon',
        tuesday: 'Tue', 
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun'
      };
      
      Object.entries(dayMap).forEach(([formKey, dayCode]) => {
        if (formValue[formKey as keyof typeof formValue]) {
          targetDays.push(dayCode);
        }
      });
      
      // Если выбраны все дни - отмечаем как ежедневно
      const finalTargetDays = targetDays.length === 7 ? ['daily'] : targetDays;
      
      // Создаем новую привычку
      const newHabit = {
        id: 'habit_' + Date.now(),
        name: formValue.name!,
        description: formValue.description || '',
        color: formValue.color!,
        targetDays: finalTargetDays,
        creationDate: new Date().toISOString()
      };
      
      // Сохраняем в localStorage
      this.saveHabit(newHabit);
      
      // Перенаправляем на главную страницу
      this.router.navigate(['/habits']);
    }
  }

  private saveHabit(habit: any): void {
    try {
      const storedHabits = localStorage.getItem('xenon_habits');
      const habits = storedHabits ? JSON.parse(storedHabits) : [];
      habits.push(habit);
      localStorage.setItem('xenon_habits', JSON.stringify(habits));
      
      console.log('Привычка сохранена:', habit);
    } catch (error) {
      console.error('Ошибка сохранения привычки:', error);
    }
  }
}