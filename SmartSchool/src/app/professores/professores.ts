import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Professor } from '../models/Professor';

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
    
    // Variável agora armazena o OBJETO Professor ou undefined (Opção 1)
    public professorSelected: Professor | undefined;

    // O compilador pode reclamar que os objetos aqui não são do tipo Professor, 
    // mas isso é resolvido se a interface Professor for um espelho deste formato.
    public professores = [
      { id: 1, nome: 'Lauro', disciplina: 'Matemática' },
      { id: 2, nome: 'Roberto', disciplina: 'Física' },
      { id: 3, nome: 'Ronaldo', disciplina: 'Português' },
      { id: 4, nome: 'Rodrigo', disciplina: 'Inglês' },
      { id: 5, nome: 'Alexandre', disciplina: 'Programação' },
    ];

    voltar(){
      // Limpando a seleção para voltar para a tabela
      this.professorSelected = undefined; 
    }

    // A função agora atribui o OBJETO COMPLETO à variável professorSelected
    ProfessorSelect(professor: Professor){
      this.professorSelected = professor; 
    }
}