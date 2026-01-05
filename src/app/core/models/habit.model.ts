export interface Habit {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  targetDays: string[];
  creationDate: Date;
}
