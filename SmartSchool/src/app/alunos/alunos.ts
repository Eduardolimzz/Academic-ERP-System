import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aluno } from '../models/Aluno';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-alunos',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos {

  public titulo = 'Alunos';
  public alunoSelected: Aluno | undefined;
  public textSimple: string | undefined;
  public alunoForm!: FormGroup; //variavel nunca sera nula ou undefined

  public alunos = [
    { id: 1, nome: 'Marta', sobrenome: 'Kent', telefone: 33225555 },
    { id: 2, nome: 'Paula', sobrenome: 'Isabela', telefone: 3354288 },
    { id: 3, nome: 'Laura', sobrenome: 'Antonia', telefone: 55668899 },
    { id: 4, nome: 'Luiza', sobrenome: 'Maria', telefone: 6565659 },
    { id: 5, nome: 'Lucas', sobrenome: 'Machado', telefone: 565685415 },
    { id: 6, nome: 'Pedro', sobrenome: 'Alvares', telefone: 456454545 },
    { id: 7, nome: 'Paulo', sobrenome: 'José', telefone: 9874512 },
  ];

  constructor(private fb: FormBuilder){
    this.criarForm();
  }

  voltar(){
    this.alunoSelected = undefined; 
  }

  alunoSubmit(){
    console.log(this.alunoForm?.value);
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required], //Validators.required é requerido, o nome é requerido
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  AlunoSelect(aluno: Aluno){ 
    this.alunoSelected = aluno; 
    this.alunoForm?.patchValue(aluno); 
  }

}
