import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Professor } from '../models/Professor';

@Component({
    selector: 'app-professores-lista',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Disciplina</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let prof of professores">
            <td scope="row">{{prof.id}}</td>
            <td>{{prof.nome}}</td>
            <td>{{prof.disciplina}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ProfessoresLista {
    @Input() professores: Professor[] = [];
}