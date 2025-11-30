import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alunos',
  imports: [
    CommonModule 
  ],
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos {

  titulo = 'Aluno';

  alunos =  [
    { nome: 'Marta' },
    { nome: 'Paula' },
    { nome: 'Luiza' },
    { nome: 'Agata' },
    { nome: 'João' },
    { nome: 'Mateus' },
    { nome: 'Paulo' },
  ];

}
