import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { Aluno } from '../models/Aluno';
import { Professor } from '../models/Professor';
import { AlunoService } from './aluno.service';
import { ProfessoresLista } from '../professores/professores-lista';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfessoresLista
  ],
  templateUrl: './alunos.html',
  styleUrl: './alunos.css',
})
export class Alunos implements OnInit, OnDestroy {

  public modalRef?: NgbModalRef;
  public alunoForm!: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado?: Aluno;
  public textSimple?: string;
  public profsAlunos: Professor[] = [];
  public alunos: Aluno[] = [];
  public aluno?: Aluno;
  public msnDeleteAluno?: string;
  public modeSave: 'post' | 'put' = 'post';
  // Novo estado para o ID do aluno a ser excluído
  public alunoIdParaExclusao: number | null = null;

  private unsubscriber = new Subject<void>();
  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.criarForm();
  }
  ngOnInit() {
    this.carregarAlunos();
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
  openModal(template: TemplateRef<any>, alunoId: number) {
    this.profsAlunos = [];
    this.modalRef = this.modalService.open(template, {
      centered: true,
      size: 'lg'
    });

    console.log('TODO: Carregar professores do aluno:', alunoId);
  }
  closeModal() {
    this.modalRef?.close();
  }
  criarForm() {
    this.alunoForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }
  novoAluno() {
    this.alunoSelecionado = { id: 0, nome: '', sobrenome: '', telefone: 0 } as Aluno;
    this.alunoForm.patchValue(this.alunoSelecionado);
    this.modeSave = 'post';
  }
  saveAluno() {
    if (this.alunoForm.valid) {

      if (this.modeSave === 'post') {
        this.aluno = { ...this.alunoForm.value };
      } else {
        this.aluno = { id: this.alunoSelecionado!.id, ...this.alunoForm.value };
      }
      const request = this.modeSave === 'post'
        ? this.alunoService.post(this.aluno!)
        : this.alunoService.put(this.aluno!);
      request
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
          () => {
            window.location.reload();
          },
          (error: any) => {
            console.error('Erro ao salvar aluno:', error);
          }
        );
    }
  }
  abrirConfirmacaoExclusao(id: number, template: TemplateRef<any>) {
    this.alunoIdParaExclusao = id;
    this.modalRef = this.modalService.open(template, { centered: true });
  }
  deletarAlunoConfirmado() {
    const id = this.alunoIdParaExclusao;

    if (id !== null) {
      this.alunoService.delete(id)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
          () => {
            this.closeModal();
            window.location.reload();
          },
          (error) => {
            console.error('Erro ao deletar aluno:', error);
            this.closeModal();
          }
        );
    }
  }
  carregarAlunos() {
    const id = +(this.route.snapshot.paramMap.get('id') || 0);

    this.alunoService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        (alunos: Aluno[]) => {
          this.alunos = alunos;

          if (id > 0) {
            const alunoEncontrado = this.alunos.find(aluno => aluno.id === id);
            if (alunoEncontrado) {
              this.alunoSelect(alunoEncontrado);
            }
          }
        },
        (error: any) => {
          console.error('Erro ao carregar alunos:', error);
          this.alunos = [];
        }
      );
  }
  alunoSelect(aluno: Aluno) {
    this.modeSave = 'put';
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }
  voltar() {
    this.alunoSelecionado = undefined;
    this.modeSave = 'post';
    this.alunoForm.reset({
      id: 0,
      nome: '',
      sobrenome: '',
      telefone: ''
    });
  }
}