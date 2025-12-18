import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  template: `
    <div style="max-width: 500px; margin: 20px auto; padding: 20px;">
      <h2>{{ isEditMode ? 'Редактировать привычку' : 'Новая привычка' }}</h2>
      
      <form [formGroup]="habitForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>Название привычки</mat-label>
          <input matInput formControlName="name" placeholder="Например: Утренняя зарядка">
          <mat-error *ngIf="habitForm.get('name')?.hasError('required')">
            Название обязательно
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 100%; margin-top: 15px;">
          <mat-label>Описание (необязательно)</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" style="width: 100%; margin-top: 15px;">
          <mat-label>Цвет</mat-label>
          <mat-select formControlName="color">
            <mat-option value="#4CAF50">Зеленый</mat-option>
            <mat-option value="#2196F3">Синий</mat-option>
            <mat-option value="#FF9800">Оранжевый</mat-option>
            <mat-option value="#9C27B0">Фиолетовый</mat-option>
          </mat-select>
        </mat-form-field>

        <div style="margin: 20px 0;">
          <h4>Дни недели:</h4>
          <mat-checkbox formControlName="monday">Понедельник</mat-checkbox>
          <mat-checkbox formControlName="tuesday">Вторник</mat-checkbox>
          <mat-checkbox formControlName="wednesday">Среда</mat-checkbox>
          <mat-checkbox formControlName="thursday">Четверг</mat-checkbox>
          <mat-checkbox formControlName="friday">Пятница</mat-checkbox>
          <mat-checkbox formControlName="saturday">Суббота</mat-checkbox>
          <mat-checkbox formControlName="sunday">Воскресенье</mat-checkbox>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button mat-raised-button color="primary" type="submit" [disabled]="!habitForm.valid">
            {{ isEditMode ? 'Обновить' : 'Создать' }}
          </button>
          <button mat-button type="button" routerLink="/habits">Отмена</button>
        </div>
      </form>
    </div>
  `,
  styles: ['']
})
export class HabitFormComponent {
  private fb = inject(FormBuilder);
  
  isEditMode = false;

  habitForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    color: ['#4CAF50'],
    monday: [true],
    tuesday: [true],
    wednesday: [true],
    thursday: [true],
    friday: [true],
    saturday: [true],
    sunday: [true]
  });

  onSubmit() {
    if (this.habitForm.valid) {
      console.log('Форма отправлена:', this.habitForm.value);
      // TODO: вызов сервиса для сохранения
      alert('Привычка сохранена!');
    }
  }
}