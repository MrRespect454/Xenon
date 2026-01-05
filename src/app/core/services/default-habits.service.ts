import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultHabitsService {
  // Вспомогательный массив для ежедневных привычек
  private readonly EVERY_DAY = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  private defaultHabits: Omit<Habit, 'id' | 'creationDate'>[] = [
    // Спорт и активность
    { name: 'Спортивные игры в команде', color: '#4CAF50', icon: 'sports_soccer', targetDays: ['Сб', 'Вс'], description: 'Футбол, баскетбол, волейбол' },
    { name: 'Йога', color: '#2196F3', icon: 'self_improvement', targetDays: this.EVERY_DAY, description: '15 минут утренней йоги' },
    { name: 'Велосипед', color: '#FF9800', icon: 'directions_bike', targetDays: ['Вт', 'Чт', 'Сб'], description: 'Прогулка на велосипеде 30+ минут' },
    { name: 'Ходьба', color: '#9C27B0', icon: 'directions_walk', targetDays: this.EVERY_DAY, description: '10 000 шагов в день' },
    { name: 'Бег', color: '#F44336', icon: 'directions_run', targetDays: ['Пн', 'Ср', 'Пт'], description: 'Утренняя пробежка' },
    { name: 'Танцы', color: '#E91E63', icon: 'music_note', targetDays: ['Вт', 'Чт', 'Сб'], description: 'Танцевальная тренировка' },
    
    // Творчество
    { name: 'Игра на гитаре', color: '#795548', icon: 'piano', targetDays: this.EVERY_DAY, description: '30 минут практики' },
    { name: 'Рисование', color: '#FF5722', icon: 'brush', targetDays: this.EVERY_DAY, description: 'Рисовать каждый день' },
    { name: 'Фотография', color: '#607D8B', icon: 'photo_camera', targetDays: this.EVERY_DAY, description: 'Сделать 1 интересный снимок' },
    { name: 'Кулинария', color: '#FFC107', icon: 'restaurant', targetDays: this.EVERY_DAY, description: 'Приготовить новое блюдо' },
    
    // Хобби
    { name: 'Чтение', color: '#3F51B5', icon: 'menu_book', targetDays: this.EVERY_DAY, description: '20 страниц в день' },
    { name: 'Садоводство', color: '#8BC34A', icon: 'grass', targetDays: this.EVERY_DAY, description: 'Уход за растениями' },
    { name: 'Рыбалка', color: '#009688', icon: 'anchor', targetDays: ['Сб', 'Вс'], description: 'Спокойный отдых' },
    
    // Развитие
    { name: 'Изучение языков', color: '#673AB7', icon: 'language', targetDays: this.EVERY_DAY, description: '30 минут в день' },
    { name: 'Волонтерство', color: '#FF5252', icon: 'volunteer_activism', targetDays: ['Сб'], description: 'Помощь другим' },
    
    // Природа и отдых
    { name: 'Выгул собак', color: '#FF9800', icon: 'pets', targetDays: this.EVERY_DAY, description: 'Прогулка с питомцем' },
    { name: 'Пикник', color: '#4CAF50', icon: 'picnic', targetDays: ['Вс'], description: 'Отдых на природе' }
    // ... можно добавить остальные по аналогии, заменяя Mon->Пн, Tue->Вт и т.д.
  ];

  getDefaultHabits(): Omit<Habit, 'id' | 'creationDate'>[] {
    return [...this.defaultHabits];
  }

  getRandomHabits(count: number = 5): Omit<Habit, 'id' | 'creationDate'>[] {
    const shuffled = [...this.defaultHabits].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}