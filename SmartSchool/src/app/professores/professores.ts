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

   titulo = 'Professor';

  professores =  [
    { nome: 'Marta' },
    { nome: 'Paula' },
    { nome: 'Luiza' },
    { nome: 'Agata' },
  ];

}
