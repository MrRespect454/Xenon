import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HabitService } from '../../../core/services/habit.service';
import { HabitListComponent } from './habit-list.component';

describe('HabitListComponent', () => {
  let component: HabitListComponent;
  let fixture: ComponentFixture<HabitListComponent>;
  let habitServiceMock: any;

  beforeEach(async () => {
    //заглушка для сервиса
    habitServiceMock = {
      habits$: of([]),
      deleteHabit: jasmine.createSpy('deleteHabit')
    };

    await TestBed.configureTestingModule({
      imports: [HabitListComponent, NoopAnimationsModule],
      providers: [
        { provide: HabitService, useValue: habitServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создаваться', () => {
    expect(component).toBeTruthy();
  });

  describe('Метод formatDay (Локализация)', () => {
    it('должен переводить "Mon" в "Пн"', () => {
      expect(component.formatDay('Mon')).toBe('Пн');
    });

    it('должен переводить "monday" (полное) в "Пн"', () => {
      expect(component.formatDay('monday')).toBe('Пн');
    });

    it('должен оставлять "Пн" без изменений, если уже на русском', () => {
      expect(component.formatDay('Пн')).toBe('Пн');
    });

    it('должен корректно обрабатывать выходные (Sun -> Вс)', () => {
      expect(component.formatDay('Sun')).toBe('Вс');
    });
  });
});