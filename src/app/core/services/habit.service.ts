import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Habit } from '../models/habit.model';
import { HabitRecord } from '../models/habit-record.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  private recordsSubject = new BehaviorSubject<HabitRecord[]>([]);

  habits$: Observable<Habit[]> = this.habitsSubject.asObservable();
  records$: Observable<HabitRecord[]> = this.recordsSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const habits = this.storageService.getHabits();
    const records = this.storageService.getRecords();
    this.habitsSubject.next(habits);
    this.recordsSubject.next(records);
  }

  addHabit(habitData: Omit<Habit, 'id' | 'creationDate'>): Habit {
    const newHabit: Habit = {
      ...habitData,
      id: this.generateId(),
      creationDate: new Date()
    };
    const currentHabits = this.habitsSubject.value;
    const updatedHabits = [...currentHabits, newHabit];
    this.habitsSubject.next(updatedHabits);
    this.storageService.saveHabits(updatedHabits);
    return newHabit;
  }

  updateHabit(id: string, changes: Partial<Habit>): void {
    const currentHabits = this.habitsSubject.value;
    const index = currentHabits.findIndex(h => h.id === id);
    
    if (index !== -1) {
      const updatedHabit = { ...currentHabits[index], ...changes };
      const updatedHabits = [...currentHabits];
      updatedHabits[index] = updatedHabit;
      this.habitsSubject.next(updatedHabits);
      this.storageService.saveHabits(updatedHabits);
    }
  }

  deleteHabit(id: string): void {
    const currentHabits = this.habitsSubject.value;
    const updatedHabits = currentHabits.filter(h => h.id !== id);
    this.habitsSubject.next(updatedHabits);
    this.storageService.saveHabits(updatedHabits);
    
    // Удаляем связанные записи
    const currentRecords = this.recordsSubject.value;
    const updatedRecords = currentRecords.filter(r => r.habitId !== id);
    this.recordsSubject.next(updatedRecords);
    this.storageService.saveRecords(updatedRecords);
  }

  toggleHabitRecord(habitId: string, date: Date): void {
    const dateStr = date.toISOString().split('T')[0];
    const currentRecords = this.recordsSubject.value;
    
    // Ищем существующую запись
    const existingRecordIndex = currentRecords.findIndex(
      r => r.habitId === habitId && r.date === dateStr
    );

    let updatedRecords: HabitRecord[];

    if (existingRecordIndex !== -1) {
      // Переключаем статус
      updatedRecords = [...currentRecords];
      updatedRecords[existingRecordIndex] = {
        ...updatedRecords[existingRecordIndex],
        isCompleted: !updatedRecords[existingRecordIndex].isCompleted
      };
    } else {
      // Создаем новую запись
      const newRecord: HabitRecord = {
        id: this.generateId(),
        habitId,
        date: dateStr,
        isCompleted: true
      };
      updatedRecords = [...currentRecords, newRecord];
    }

    this.recordsSubject.next(updatedRecords);
    this.storageService.saveRecords(updatedRecords);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
