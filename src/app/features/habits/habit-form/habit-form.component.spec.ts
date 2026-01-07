import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HabitService } from '../../../core/services/habit.service';
import { HabitFormComponent } from './habit-form.component';

describe('HabitFormComponent', () => {
  let component: HabitFormComponent;
  let fixture: ComponentFixture<HabitFormComponent>;
  let habitService: jasmine.SpyObj<HabitService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const habitSpy = jasmine.createSpyObj('HabitService', ['addHabit'], { isDark$: { subscribe: () => {} } });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HabitFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: HabitService, useValue: habitSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitFormComponent);
    component = fixture.componentInstance;
    habitService = TestBed.inject(HabitService) as jasmine.SpyObj<HabitService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('форма должна быть невалидна, если название пустое', () => {
    component.habitForm.controls['name'].setValue('');
    expect(component.habitForm.valid).toBeFalse();
  });

  it('должен вызывать addHabit с русскими днями при отправке формы', () => {
    // Заполняем форму
    component.habitForm.patchValue({
      name: 'Бег',
      'Пн': true,
      'Ср': true
    });

    component.onSubmit();
    const passedHabit = habitService.addHabit.calls.mostRecent().args[0];
    expect(passedHabit.name).toBe('Бег');
    expect(passedHabit.targetDays).toEqual(['Пн', 'Ср']);
    expect(router.navigate).toHaveBeenCalledWith(['/habits']);
  });
});