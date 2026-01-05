import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HabitRecord } from '../models/habit-record.model';
import { Habit } from '../models/habit.model';

@Injectable({ providedIn: 'root' })
export class HabitService {
  private readonly HABITS_KEY = 'xenon_habits';
  private readonly RECORDS_KEY = 'xenon_records';

  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  private recordsSubject = new BehaviorSubject<HabitRecord[]>([]);

  public habits$ = this.habitsSubject.asObservable();
  public records$ = this.recordsSubject.asObservable();

  private isDarkSubject = new BehaviorSubject<boolean>(localStorage.getItem('theme') === 'dark');
  public isDark$ = this.isDarkSubject.asObservable();

  constructor() { this.loadData(); }

  private loadData() {
    const habitsJson = localStorage.getItem(this.HABITS_KEY);
    if (habitsJson) this.habitsSubject.next(JSON.parse(habitsJson));
    const recordsJson = localStorage.getItem(this.RECORDS_KEY);
    if (recordsJson) this.recordsSubject.next(JSON.parse(recordsJson));
  }

  addHabit(habit: Habit) {
    const updated = [...this.habitsSubject.value, habit];
    this.updateHabits(updated);
  }

  // МЕТОД УДАЛЕНИЯ 
  deleteHabit(id: string) {
    const habits = this.habitsSubject.value.filter(h => h.id !== id);
    const records = this.recordsSubject.value.filter(r => r.habitId !== id);
    this.updateHabits(habits);
    this.updateRecords(records);
  }

  toggleCompletion(habitId: string, date: string) {
    const current = this.recordsSubject.value;
    const index = current.findIndex(r => r.habitId === habitId && r.date === date);
    const updated = index > -1 
      ? current.filter((_, i) => i !== index) 
      : [...current, { id: Date.now().toString(), habitId, date, isCompleted: true }];
    this.updateRecords(updated);
  }

  getStreak(habitId: string): number {
    const records = this.recordsSubject.value
      .filter(r => r.habitId === habitId)
      .map(r => r.date)
      .sort((a, b) => b.localeCompare(a));
    if (records.length === 0) return 0;
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(records[0]);
    if (Math.floor((checkDate.getTime() - lastDate.getTime()) / 86400000) > 1) return 0;
    for (let i = 0; i < records.length; i++) {
      if (i === 0 || (new Date(records[i-1]).getTime() - new Date(records[i]).getTime()) === 86400000) streak++;
      else break;
    }
    return streak;
  }

  toggleTheme() {
    const newDark = !this.isDarkSubject.value;
    this.isDarkSubject.next(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-theme', newDark);
  }

  getSuggestions() {
    return [
      { name: 'Пить воду', color: '#2196F3', description: '2 литра', icon: 'water_drop' },
      { name: 'Чтение', color: '#FF9800', description: '20 страниц', icon: 'book' },
      { name: 'Зарядка', color: '#4CAF50', description: '10 минут', icon: 'fitness_center' }
    ];
  }

  private updateHabits(habits: Habit[]) {
    this.habitsSubject.next(habits);
    localStorage.setItem(this.HABITS_KEY, JSON.stringify(habits));
  }

  private updateRecords(records: HabitRecord[]) {
    this.recordsSubject.next(records);
    localStorage.setItem(this.RECORDS_KEY, JSON.stringify(records));
  }
}