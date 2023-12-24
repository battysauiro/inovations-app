import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario/usuario';
import { AuthService } from '../servicios/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertasComponent } from '../components/alertas/alertas.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario;
  
  constructor(
    public authService:AuthService,
    private dialog: MatDialog,
    private router:Router
  ) { 
    this.usuario= new Usuario();
  }

  ngOnInit(): void {
  }

  loginUsuarios():void{
    if(this.usuario.usuario==null || this.usuario.password==null 
      || this.usuario.usuario=='' ||this.usuario.password==''){
      const dialogRef = this.dialog.open(AlertasComponent, {
        disableClose:true,
        data: {tipo:'error',titulo:'Oops...',
        texto:'Error de Login usuario o nombre vacios!',
        noMostrarCancelar:true
      }
      });
      return;
    }
    this.authService.login(this.usuario).subscribe(
      {
        next:response=>{
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          this.router.navigate(['/inicio']);
        },
        error:error =>{
          if (error.status === 400 || error.status === 401) {
            console.log('Error de Login', 'Usuario o contraseña incorrectos!', 'error');
            this.dialog.open(AlertasComponent, {
              disableClose:true,
              data: {tipo:'error',titulo:'Oops...',
              texto:'Error de Login: Usuario o contraseña incorrectos!',
              noMostrarCancelar:true
            }
            });
          }
        }
      }
    );
  }

}
