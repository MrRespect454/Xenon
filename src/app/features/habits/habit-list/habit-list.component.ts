import { Component } from '@angular/core';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  template: `
    <h2>Мои привычки</h2>
    <ul>
      <li>Утренняя зарядка</li>
      <li>Чтение книги</li>
      <li>Прогулка</li>
    </ul>
  `
})
export class HabitListComponent {}