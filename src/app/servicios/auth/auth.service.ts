import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/modelo/usuario/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario:Usuario;
  private _token:string;
  constructor(public http:HttpClient) { }

  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){
      this._usuario=JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token=sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario:Usuario):Observable<any>{

    const urlEndpoint=environment.baseUrlAuth;


    const credenciales=btoa('AngularIOIapp'+':'+'IOIinteractive');
    const httpHeaders= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic '+credenciales});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.usuario);
    params.set('password',usuario.password);
    return this.http.post<any>(urlEndpoint,params.toString(),{headers:httpHeaders});
  }

  guardarUsuario(accessToken: string):void{
    let payLoad = this.obtenerDatosToken(accessToken);
    this._usuario= new Usuario();
    this._usuario.idUsuario=payLoad.idUsuario;
    this._usuario.usuario=payLoad.nombreUsuario;
    this._usuario.nombrePersona=payLoad.nombrePersona;
    this._usuario.roles=payLoad.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));

  }
  guardarToken(accessToken: string):void{
    this._token=accessToken;
    sessionStorage.setItem('token',accessToken);
  }

  obtenerDatosToken(accessToken:string):any{
    if(accessToken!=null){
      //return JSON.parse(atob(accessToken.split(".")[1]))
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = decodeURIComponent(
      Array.from(atob(base64))
      .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
      .join("")
    );
    return JSON.parse(decodedToken);

    }
    return null;
  }

    isAuthenticated():boolean{
    let payLoad= this.obtenerDatosToken(this.token);
    if(payLoad!=null && payLoad.user_name && payLoad.user_name.length>0){
      return true;
    }
    return false;
  }

  logout():void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
    localStorage.clear();
  }

  hasRole(roles:string[]):boolean{
    for(let rol of roles){
      if(this.usuario.roles.includes(rol)){
        return true;
      }

    }
    return false;
  }
}
