import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aluno } from '../models/Aluno';

@Component({
    selector: 'app-alunos-lista',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Sobrenome</th>
            <th scope="col">Telefone</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let aluno of alunos">
            <td scope="row">{{aluno.id}}</td>
            <td>{{aluno.nome}}</td>
            <td>{{aluno.sobrenome}}</td>
            <td>{{aluno.telefone}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AlunosLista {
    @Input() alunos: Aluno[] = [];
}