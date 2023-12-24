import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private toastr: ToastrService,
    private router:Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(e=>{
        if(e.status== 401){
          if(this.authService.isAuthenticated()){
            this.toastr.error('Vuelva a inicar sesion', 'Su sesion a expirado',{"positionClass" : "toast-top-center"});
            //alert("Su sesion a expirado,vuelva a inicar sesion");
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }
        if(e.status== 403){
          this.toastr.error('No tiene acceso al recurso', 'Acceso denegado',{"positionClass" : "toast-top-center"});
          //alert("NO NO NO acceso denegado "+`${this.authService.usuario.nombrePersona} no tienes acceso a este recurso`);
          this.router.navigate(['/inicio']);
        }
        return throwError(() => e);
      })
    ); 

  }
}
