import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertasComponent } from './components/alertas/alertas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './servicios/interceptors/token.interceptor';
import { AuthInterceptor } from './servicios/interceptors/auth.interceptor';
import { FormularioClientesComponent } from './paginas/clientes/formuario-clientes/formuario-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClientesComponent,
    AlertasComponent,
    InicioComponent,
    FormularioClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
