import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // RouterLink not needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],  // Removed unused RouterLink
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('angularapp');
}
