import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Professor } from '../models/Professor';
import { AlunosLista } from '../alunos/alunos-lista';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfessorService } from './professor.service'; 

// 💡 NECESSÁRIO PARA COMUNICAÇÃO ASSÍNCRONA E CONTROLE DE MEMÓRIA
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 

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
export class Professores implements OnInit, OnDestroy {

  public modalRef?: NgbModalRef;
  titulo = 'Professores';
  public professorSelected: Professor | undefined;
  public textSimple: string | undefined;
  public professorForm!: FormGroup;
  public alunosDoProfessor: any[] = [];
  public professores: Professor[] = []; 
  public professorIdParaExclusao: number | null = null; // 👈 VARIÁVEL DE ESTADO
  public modeSave: 'post' | 'put' = 'post';

  private unsubscriber = new Subject<void>(); // 👈 VARIÁVEL DE CONTROLE

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private professorService: ProfessorService 
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.carregarProfessores();
  }
  
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  carregarProfessores() {
    this.professorService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe({
        next: (professores: Professor[]) => {
          this.professores = professores;
        },
        error: (error) => {
          console.error('Erro ao carregar professores:', error);
        }
      });
  }

  openModal(template: TemplateRef<any>, professorId: number) { 
    
    this.professorService.getProfessoresByAlunoId(professorId)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe({
        next: (alunos) => {
          this.alunosDoProfessor = alunos; 
        },
        error: (error) => {
          console.error('Erro ao buscar alunos do professor:', error);
          this.alunosDoProfessor = [];
        }
      });

    this.modalRef = this.modalService.open(template, {
      centered: true,
      size: 'lg'
    });
  }

  closeModal() {
    this.modalRef?.close();
  }

  // 🟢 NOVO: Prepara o formulário para um novo professor
  novoProfessor() {
      // 0 no ID indica que é um novo registro
      this.professorSelected = { id: 0, nome: '', disciplina: '' } as Professor;
      this.professorForm.reset({ id: 0, nome: '', disciplina: '' });
      this.modeSave = 'post';
  }

  voltar() {
    this.professorSelected = undefined;
    this.professorForm.reset({ id: 0, nome: '', disciplina: '' }); // Reset com valores iniciais
    this.modeSave = 'post';
    this.carregarProfessores(); // Recarrega a lista para garantir a atualização
  }

  professorSubmit() {
    if (this.professorForm.valid) {
      const professorData = this.professorForm.value;
      
      const request = professorData.id === 0 
          ? this.professorService.post(professorData) // POST
          : this.professorService.put(professorData);  // PUT

      request.pipe(takeUntil(this.unsubscriber)).subscribe({
        next: () => {
          this.voltar(); // Volta para a tela principal e recarrega os dados
        },
        error: (error) => {
          console.error('Erro ao salvar professor:', error);
        }
      });
    }
  }

  criarForm() {
    this.professorForm = this.fb.group({
      id: [0], 
      nome: ['', Validators.required],
      disciplina: ['', Validators.required]
    });
  }

  ProfessorSelect(professor: Professor) {
    this.professorSelected = professor;
    this.modeSave = 'put'; // Define como modo edição
    this.professorForm.patchValue(professor);
  }

  // 🗑️ NOVO: Prepara e abre o modal de confirmação para exclusão
  abrirConfirmacaoExclusao(id: number, template: TemplateRef<any>) {
      this.professorIdParaExclusao = id;
      this.modalRef = this.modalService.open(template, { centered: true });
  }

  // 🗑️ NOVO: Executa a exclusão após a confirmação
  deletarProfessorConfirmado() {
      const id = this.professorIdParaExclusao;

      if (id !== null) {
          this.professorService.delete(id)
              .pipe(takeUntil(this.unsubscriber))
              .subscribe({
                  next: () => {
                      this.closeModal();
                      this.carregarProfessores(); // Recarrega a lista
                  },
                  error: (error) => {
                      console.error('Erro ao deletar professor:', error);
                      this.closeModal();
                  }
              });
      }
  }
}