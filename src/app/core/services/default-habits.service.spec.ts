import { TestBed } from '@angular/core/testing';
import { DefaultHabitsService } from './default-habits.service';

describe('DefaultHabitsService', () => {
  let service: DefaultHabitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultHabitsService);
  });

  it('должен возвращать массив дефолтных привычек', () => {
    const habits = service.getDefaultHabits();
    expect(habits.length).toBeGreaterThan(0);
    expect(Array.isArray(habits)).toBeTrue();
  });

  it('метод getRandomHabits должен возвращать заданное количество элементов', () => {
    const count = 3;
    const randomHabits = service.getRandomHabits(count);
    expect(randomHabits.length).toBe(count);
  });

  it('все targetDays в дефолтных привычках должны быть на русском', () => {
    const habits = service.getDefaultHabits();
    const russianDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    habits.forEach(habit => {
      habit.targetDays.forEach(day => {
        expect(russianDays).toContain(day, `Ошибка в привычке "${habit.name}": день "${day}" не на русском.`);
      });
    });
  });
});