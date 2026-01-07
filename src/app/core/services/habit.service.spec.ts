import { TestBed } from '@angular/core/testing';
import { Habit } from '../models/habit.model';
import { HabitService } from './habit.service';

describe('HabitService', () => {
  let service: HabitService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [HabitService]
    });
    service = TestBed.inject(HabitService);
  });

  it('должен инициализироваться с пустым списком (если localStorage пуст)', (done) => {
    service.habits$.subscribe(habits => {
      expect(habits.length).toBe(0);
      done();
    });
  });

  it('должен добавлять новую привычку и сохранять её в localStorage', (done) => {
    const newHabit: Habit = {
      id: '1',
      name: 'Тестовая привычка',
      description: 'Описание',
      color: '#000000',
      icon: 'star', // Исправлено: добавлено обязательное поле icon
      targetDays: ['Пн'],
      creationDate: new Date()
    };

    service.addHabit(newHabit);

    service.habits$.subscribe(habits => {
      expect(habits.length).toBe(1);
      expect(habits[0].name).toBe('Тестовая привычка');
      
      const saved = JSON.parse(localStorage.getItem('habits') || '[]');
      expect(saved[0].name).toBe('Тестовая привычка');
      done();
    });
  });

  it('должен удалять привычку по ID', (done) => {
    const habitToRemove: Habit = { 
      id: '99', 
      name: 'Удалить меня', 
      description: '',
      targetDays: [], 
      color: '#ff0000', 
      icon: 'delete', // Исправлено: добавлено обязательное поле icon
      creationDate: new Date() 
    };
    
    service.addHabit(habitToRemove);
    service.deleteHabit('99');

    service.habits$.subscribe(habits => {
      expect(habits.find(h => h.id === '99')).toBeUndefined();
      done();
    });
  });
});