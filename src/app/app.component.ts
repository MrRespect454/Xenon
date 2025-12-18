import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1 style="color: #1976d2; padding: 20px;">Xenon</h1>
    <div style="padding: 0 20px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
