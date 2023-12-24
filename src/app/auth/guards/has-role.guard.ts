import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private toastr: ToastrService,
    private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const allowedRoles =route.data?.['allowedRoles'];
      if(Boolean(this.authService.hasRole(allowedRoles))){
        return true;
      }
      else{
        this.toastr.error('No autorizado', 'Acceso denegado',{"positionClass" : "toast-top-center"});
        this.router.navigate(['/inicio']);
        return false;
      }
  }
  
}
