import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../models/Professor'; // Assumindo o caminho do modelo

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  // ⚠️ AJUSTE ESTA URL SE O SEU BACKEND ESTIVER EM OUTRO LOCAL OU PORTA
  private baseUrl = 'http://localhost:5000/Professor'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/${id}`);
  }
  
  post(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${this.baseUrl}`, professor);
  }

  put(professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.baseUrl}/${professor.id}`, professor);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  getProfessoresByAlunoId(alunoId: number): Observable<Professor[]> {
      return this.http.get<Professor[]>(`${this.baseUrl}/ByAluno/${alunoId}`);
  }
}