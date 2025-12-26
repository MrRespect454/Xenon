import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-habit-form',
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.css']
})
export class HabitFormComponent {
  iconOptions = [
    'sports_soccer', 'self_improvement', 'directions_bike', 'directions_walk',
    'directions_run', 'music_note', 'piano', 'brush', 'photo_camera',
    'restaurant', 'view_comfy', 'menu_book', 'grass', 'anchor',
    'hiking', 'language', 'edit_note', 'volunteer_activism', 'sports',
    'picnic', 'agriculture', 'pets', 'carpenter', 'handyman',
    'emoji_objects', 'mic', 'groups', 'collections', 'book',
    'folded_hands', 'sculpture', 'radio', 'search', 'rowing',
    'target', 'sports_esports', 'nature', 'explore', 'whatshot',
    'cut', 'headphones', 'comedy', 'psychology', 'favorite',
    'water_drop', 'eco', 'flight', 'directions_boat', 'snowboarding'
  ];

  habitForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    color: ['#4CAF50'],
    icon: ['psychology']
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HabitFormComponent>
  ) {}

  onSubmit() {
    if (this.habitForm.valid) {
      this.dialogRef.close(this.habitForm.value);
    }
  }
}