import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'inicio', component: InicioComponent, data: { title: 'inicio'} },
  { path: 'clientes', component: ClientesComponent, data: { title: 'clientes'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
