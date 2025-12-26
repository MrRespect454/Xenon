import { Injectable } from '@angular/core';
import { HabitRecord } from '../models/habit-record.model';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly HABITS_KEY = 'xenon';
  private readonly RECORDS_KEY = 'xenon_records';

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.HABITS_KEY)) {
      localStorage.setItem(this.HABITS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.RECORDS_KEY)) {
      localStorage.setItem(this.RECORDS_KEY, JSON.stringify([]));
    }
  }

  saveHabits(habits: Habit[]): void {
    try {
      localStorage.setItem(this.HABITS_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error('Ошибка сохранения привычек:', error);
    }
  }

  getHabits(): Habit[] {
    try {
      const data = localStorage.getItem(this.HABITS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ошибка загрузки привычек:', error);
      return [];
    }
  }

  saveRecords(records: HabitRecord[]): void {
    try {
      localStorage.setItem(this.RECORDS_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('Ошибка сохранения записей:', error);
    }
  }

  getRecords(): HabitRecord[] {
    try {
      const data = localStorage.getItem(this.RECORDS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ошибка загрузки записей:', error);
      return [];
    }
  }

  clearStorage(): void {
    localStorage.removeItem(this.HABITS_KEY);
    localStorage.removeItem(this.RECORDS_KEY);
    this.initializeStorage();
  }
}
