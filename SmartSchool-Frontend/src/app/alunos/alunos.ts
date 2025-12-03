import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aluno } from '../models/Aluno';
import { ProfessoresLista } from '../professores/professores-lista';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-alunos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfessoresLista
  ],
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos {

  public modalRef?: NgbModalRef;
  public titulo = 'Alunos';
  public alunoSelected: Aluno | undefined;
  public textSimple: string | undefined;
  public alunoForm!: FormGroup;
  public professoresDoAluno: any[] = [];

  public alunos = [
    { id: 1, nome: 'Marta', sobrenome: 'Kent', telefone: 33225555 },
    { id: 2, nome: 'Paula', sobrenome: 'Isabela', telefone: 3354288 },
    { id: 3, nome: 'Laura', sobrenome: 'Antonia', telefone: 55668899 },
    { id: 4, nome: 'Luiza', sobrenome: 'Maria', telefone: 6565659 },
    { id: 5, nome: 'Lucas', sobrenome: 'Machado', telefone: 565685415 },
    { id: 6, nome: 'Pedro', sobrenome: 'Alvares', telefone: 456454545 },
    { id: 7, nome: 'Paulo', sobrenome: 'José', telefone: 9874512 },
  ];

  private todosProfessores = [
    { id: 1, nome: 'Lauro', disciplina: 'Matemática' },
    { id: 2, nome: 'Roberto', disciplina: 'Física' },
    { id: 3, nome: 'Ronaldo', disciplina: 'Português' },
    { id: 4, nome: 'Rodrigo', disciplina: 'Inglês' },
    { id: 5, nome: 'Alexandre', disciplina: 'Programação' },
  ];

  private alunoProfessorRelacao: any = {
    1: [1, 3, 5],
    2: [1, 2],
    3: [1, 3],
    4: [2, 4],
    5: [2, 4, 5],
    6: [3, 5],
    7: [4, 5],
  };

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.criarForm();
  }

  openModal(template: TemplateRef<any>) {
    // Mostra TODOS os professores
    this.professoresDoAluno = this.todosProfessores;

    this.modalRef = this.modalService.open(template, {
      centered: true,
      size: 'lg'
    });
  }

  voltar() {
    this.alunoSelected = undefined;
  }

  alunoSubmit() {
    console.log(this.alunoForm?.value);
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  AlunoSelect(aluno: Aluno) {
    this.alunoSelected = aluno;
    this.alunoForm?.patchValue(aluno);
  }
}