import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Alunos } from './alunos/alunos';
import { Professores } from './professores/professores';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    Alunos,
    Professores,
    Nav,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SmartSchool');
}
