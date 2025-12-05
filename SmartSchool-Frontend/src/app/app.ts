import { Component, signal } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { Nav } from './nav/nav';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Nav,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SmartSchool-Frontend');
}