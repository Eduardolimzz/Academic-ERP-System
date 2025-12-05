import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/enviroment";
import { Aluno } from "../models/Aluno";

@Injectable({
    providedIn: 'root'
})
export class AlunoService {

    baseURL = `${environment.mainUrlAPI}/api/aluno`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Aluno[]> {
        return this.http.get<Aluno[]>(this.baseURL);
    }

    getById(id: number): Observable<Aluno> {
        return this.http.get<Aluno>(`${this.baseURL}/${id}`);
    }

    getByDisciplinaId(id: number): Observable<Aluno[]> {
        return this.http.get<Aluno[]>(`${this.baseURL}/ByDisciplina/${id}`);
    }

    post(aluno: Aluno) {
        return this.http.post(this.baseURL, aluno);
    }

    put(aluno: Aluno) {
        return this.http.put(`${this.baseURL}/${aluno.id}`, aluno);
    }

    delete(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`);
    }
}