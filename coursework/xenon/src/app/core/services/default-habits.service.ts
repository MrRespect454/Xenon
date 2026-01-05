import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultHabitsService {
  private defaultHabits: Habit[] = [
    {
      name: 'Пить воду',
      description: 'Выпивать 2 литра воды в день',
      color: '#2196F3',
      icon: 'water_drop',
      targetDays: ['daily']
    },
    // Add more default habits here
  ];

  getRandomHabits(count: number): Habit[] {
    return this.defaultHabits
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }
}