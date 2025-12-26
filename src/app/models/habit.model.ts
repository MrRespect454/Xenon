export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
  targetDays: string[];
  creationDate: Date | string;
}

export interface HabitRecord {
  id: string;
  habitId: string;
  date: string;
  isCompleted: boolean;
}
