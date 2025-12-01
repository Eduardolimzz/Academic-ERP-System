import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Professor } from '../models/Professor';
import { AlunosLista } from '../alunos/alunos-lista';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-professores',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlunosLista
  ],
  templateUrl: './professores.html',
  styleUrl: './professores.css',
})
export class Professores {

  public modalRef?: NgbModalRef;
  titulo = 'Professores';
  public professorSelected: Professor | undefined;
  public textSimple: string | undefined;
  public professorForm!: FormGroup;
  public alunosDoProfessor: any[] = [];

  public professores = [
    { id: 1, nome: 'Lauro', disciplina: 'Matemática' },
    { id: 2, nome: 'Roberto', disciplina: 'Física' },
    { id: 3, nome: 'Ronaldo', disciplina: 'Português' },
    { id: 4, nome: 'Rodrigo', disciplina: 'Inglês' },
    { id: 5, nome: 'Alexandre', disciplina: 'Programação' },
  ];

  private todosAlunos = [
    { id: 1, nome: 'Marta', sobrenome: 'Kent', telefone: 33225555 },
    { id: 2, nome: 'Paula', sobrenome: 'Isabela', telefone: 3354288 },
    { id: 3, nome: 'Laura', sobrenome: 'Antonia', telefone: 55668899 },
    { id: 4, nome: 'Luiza', sobrenome: 'Maria', telefone: 6565659 },
    { id: 5, nome: 'Lucas', sobrenome: 'Machado', telefone: 565685415 },
    { id: 6, nome: 'Pedro', sobrenome: 'Alvares', telefone: 456454545 },
    { id: 7, nome: 'Paulo', sobrenome: 'José', telefone: 9874512 },
  ];

  private professorAlunoRelacao: any = {
    1: [1, 2, 3],
    2: [2, 4, 5],
    3: [1, 3, 6],
    4: [4, 5, 7],
    5: [1, 5, 6, 7],
  };

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    // Mostra TODOS os alunos
    this.alunosDoProfessor = this.todosAlunos;

    this.modalRef = this.modalService.open(template, {
      centered: true,
      size: 'lg'
    });
  }

  voltar() {
    this.professorSelected = undefined;
  }

  professorSubmit() {
    console.log(this.professorForm.value);
  }

  criarForm() {
    this.professorForm = this.fb.group({
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
  }

  ProfessorSelect(professor: Professor) {
    this.professorSelected = professor;
    this.professorForm.patchValue(professor);
  }
}