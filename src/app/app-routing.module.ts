import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { FormularioClientesComponent } from './paginas/clientes/formuario-clientes/formuario-clientes.component';
import { PlanesComponent } from './paginas/planes/planes.component';
import { FormularioPlanesComponent } from './paginas/planes/formulario-planes/formulario-planes.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'inicio', component: InicioComponent, data: { title: 'inicio'}, canActivate:[AuthGuard] },
  { path: 'clientes', component: ClientesComponent, data: { title: 'clientes'}, canActivate:[AuthGuard] },
  { path: 'clientes/agregar', component: FormularioClientesComponent, data: { title: 'agregar cliente'}, canActivate:[AuthGuard] },
  { path: 'clientes/agregar/:id/:tipo', component: FormularioClientesComponent, data: { title: 'ver cliente'}, canActivate:[AuthGuard] },
  { path: 'planes', component: PlanesComponent, data: { title: 'planes'}, canActivate:[AuthGuard] },
  { path: 'planes/agregar', component: FormularioPlanesComponent, data: { title: 'agregar plan'}, canActivate:[AuthGuard] },
  { path: 'planes/agregar/:id/:tipo', component: FormularioPlanesComponent, data: { title: 'ver plan'}, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
