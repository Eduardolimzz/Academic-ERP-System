import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professores',
  imports: [
    CommonModule 
  ],
  templateUrl: './professores.html',
  styleUrl: './professores.css',
})
export class Professores {

   titulo = 'Professores';

 public professores = [
  { id: 1, nome: 'Lauro', disciplina: 'Matemática' },
  { id: 2, nome: 'Roberto', disciplina: 'Física' },
  { id: 3, nome: 'Ronaldo', disciplina: 'Português' },
  { id: 4, nome: 'Rodrigo', disciplina: 'Inglês' },
  { id: 5, nome: 'Alexandre', disciplina: 'Programação' },
];

}
