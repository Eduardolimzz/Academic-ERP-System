import { Routes } from '@angular/router';
import { Professores } from './professores/professores';
import { Alunos } from './alunos/alunos';
import { Dashboard } from './dashboard/dashboard';
import { Perfil } from './perfil/perfil';
import { Titulo } from './titulo/titulo';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'professores', component: Professores },
    { path: 'perfil', component: Perfil },
    { path: 'dashboard', component: Dashboard },
    { path: 'alunos', component: Alunos }, 
    { path: 'titulo', component: Titulo }, 
];