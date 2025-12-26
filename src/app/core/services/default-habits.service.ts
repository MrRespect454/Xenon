import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultHabitsService {
  private defaultHabits: Omit<Habit, 'id' | 'creationDate'>[] = [
    // Спорт и активность
    { name: 'Спортивные игры в команде', color: '#4CAF50', icon: 'sports_soccer', targetDays: ['Sat', 'Sun'], description: 'Футбол, баскетбол, волейбол' },
    { name: 'Йога', color: '#2196F3', icon: 'self_improvement', targetDays: ['daily'], description: '15 минут утренней йоги' },
    { name: 'Велосипед', color: '#FF9800', icon: 'directions_bike', targetDays: ['Tue', 'Thu', 'Sat'], description: 'Прогулка на велосипеде 30+ минут' },
    { name: 'Ходьба', color: '#9C27B0', icon: 'directions_walk', targetDays: ['daily'], description: '10 000 шагов в день' },
    { name: 'Бег', color: '#F44336', icon: 'directions_run', targetDays: ['Mon', 'Wed', 'Fri'], description: 'Утренняя пробежка' },
    { name: 'Танцы', color: '#E91E63', icon: 'music_note', targetDays: ['Tue', 'Thu', 'Sat'], description: 'Танцевальная тренировка' },
    
    // Творчество
    { name: 'Игра на гитаре', color: '#795548', icon: 'piano', targetDays: ['daily'], description: '30 минут практики' },
    { name: 'Рисование', color: '#FF5722', icon: 'brush', targetDays: ['daily'], description: 'Рисовать каждый день' },
    { name: 'Фотография', color: '#607D8B', icon: 'photo_camera', targetDays: ['daily'], description: 'Сделать 1 интересный снимок' },
    { name: 'Кулинария', color: '#FFC107', icon: 'restaurant', targetDays: ['daily'], description: 'Приготовить новое блюдо' },
    { name: 'Вязание', color: '#00BCD4', icon: 'view_comfy', targetDays: ['daily'], description: 'Творческий процесс' },
    
    // Хобби
    { name: 'Чтение', color: '#3F51B5', icon: 'menu_book', targetDays: ['daily'], description: '20 страниц в день' },
    { name: 'Садоводство', color: '#8BC34A', icon: 'grass', targetDays: ['daily'], description: 'Уход за растениями' },
    { name: 'Рыбалка', color: '#009688', icon: 'anchor', targetDays: ['Sat', 'Sun'], description: 'Спокойный отдых' },
    { name: 'Туризм', color: '#CDDC39', icon: 'hiking', targetDays: ['Sat', 'Sun'], description: 'Походы на природу' },
    
    // Развитие
    { name: 'Изучение иностранных языков', color: '#673AB7', icon: 'language', targetDays: ['daily'], description: '30 минут в день' },
    { name: 'Ведение блога', color: '#9E9E9E', icon: 'edit_note', targetDays: ['daily'], description: 'Писать каждый день' },
    { name: 'Волонтерство', color: '#FF5252', icon: 'volunteer_activism', targetDays: ['Sat'], description: 'Помощь другим' },
    
    // Спорт и игры
    { name: 'Бильярд', color: '#795548', icon: 'sports', targetDays: ['Wed', 'Fri'], description: 'Игра с друзьями' },
    { name: 'Боулинг', color: '#FF9800', icon: 'sports', targetDays: ['Fri'], description: 'Активный отдых' },
    { name: 'Дартс', color: '#F44336', icon: 'sports', targetDays: ['daily'], description: 'Тренировка меткости' },
    
    // Активный отдых
    { name: 'Пикник', color: '#4CAF50', icon: 'picnic', targetDays: ['Sun'], description: 'Отдых на природе' },
    { name: 'Катание на лошадях', color: '#795548', icon: 'agriculture', targetDays: ['Sat', 'Sun'], description: 'Верховая езда' },
    { name: 'Выгул собак', color: '#FF9800', icon: 'pets', targetDays: ['daily'], description: 'Прогулка с питомцем' },
    
    // Ремесла
    { name: 'Столярные работы', color: '#795548', icon: 'carpenter', targetDays: ['Sat'], description: 'Работа с деревом' },
    { name: 'Работа с металлом', color: '#607D8B', icon: 'handyman', targetDays: ['Sat'], description: 'Металлообработка' },
    { name: 'Изготовление свечей', color: '#FFC107', icon: 'emoji_objects', targetDays: ['Sat'], description: 'Творческий процесс' },
    
    // Музыка
    { name: 'Пение', color: '#E91E63', icon: 'mic', targetDays: ['daily'], description: 'Вокальная практика' },
    { name: 'Игра в музыкальной группе', color: '#9C27B0', icon: 'groups', targetDays: ['Wed', 'Sat'], description: 'Репетиции с группой' },
    
    // Коллекционирование
    { name: 'Коллекционирование', color: '#795548', icon: 'collections', targetDays: ['daily'], description: 'Поиск новых экземпляров' },
    { name: 'Скрапбукинг', color: '#FF5722', icon: 'book', targetDays: ['Sat'], description: 'Создание альбомов' },
    
    // Экстрим
    { name: 'Паркур', color: '#2196F3', icon: 'directions_run', targetDays: ['Tue', 'Thu', 'Sat'], description: 'Тренировка движения' },
    { name: 'Страйкбол', color: '#F44336', icon: 'sports', targetDays: ['Sun'], description: 'Командная игра' },
    
    // Медитация и спокойствие
    { name: 'Оригами', color: '#FF9800', icon: 'folded_hands', targetDays: ['daily'], description: 'Складывание фигурок' },
    { name: 'Лепка', color: '#795548', icon: 'sculpture', targetDays: ['daily'], description: 'Работа с глиной/пластилином' },
    
    // Наука и техника
    { name: 'Радио', color: '#3F51B5', icon: 'radio', targetDays: ['daily'], description: 'Радиолюбительство' },
    { name: 'Металлоискатель', color: '#FFC107', icon: 'search', targetDays: ['Sat', 'Sun'], description: 'Поиск сокровищ' },
    
    // Активный образ жизни
    { name: 'Гребля', color: '#2196F3', icon: 'rowing', targetDays: ['Sat', 'Sun'], description: 'Прогулка на лодке' },
    { name: 'Тир', color: '#795548', icon: 'target', targetDays: ['Sat'], description: 'Стрельба по мишеням' },
    { name: 'Пинбол', color: '#F44336', icon: 'sports_esports', targetDays: ['daily'], description: 'Аркадная игра' },
    
    // Природа
    { name: 'Охота', color: '#795548', icon: 'nature', targetDays: ['Sat', 'Sun'], description: 'Поход в лес' },
    { name: 'Диггерство', color: '#607D8B', icon: 'explore', targetDays: ['Sat', 'Sun'], description: 'Исследование местности' },
    
    // Творческие хобби
    { name: 'Выжигание', color: '#FF5722', icon: 'whatshot', targetDays: ['Sat'], description: 'Выжигание по дереву' },
    { name: 'Шитьё', color: '#E91E63', icon: 'cut', targetDays: ['Sat'], description: 'Создание одежды' },
    { name: 'Увлечение музыкой', color: '#9C27B0', icon: 'headphones', targetDays: ['daily'], description: 'Прослушивание музыки' },
    { name: 'Стендап', color: '#FFC107', icon: 'comedy', targetDays: ['daily'], description: 'Юмористические выступления' }
  ];

  getDefaultHabits(): Omit<Habit, 'id' | 'creationDate'>[] {
    return [...this.defaultHabits];
  }

  getRandomHabits(count: number = 5): Omit<Habit, 'id' | 'creationDate'>[] {
    const shuffled = [...this.defaultHabits].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}