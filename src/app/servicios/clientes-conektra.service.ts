import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../modelo/clientes/cliente';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesConektraService {
  token=this.authService.usuario.tokenConektra;
  constructor(private httpClient:HttpClient,
    private authService:AuthService) { 

    }

  listarClientesConektra():Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-clientes/listar/${this.token}`);
  }

  obtenerClienteConektra(idCliente:string):Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-clientes/obtener-cliente/${this.token}/${idCliente}`);
  }

  agregarClienteConektra(cliente:Cliente):Observable<Cliente>{
    return this.httpClient.post<Cliente>(`${environment.baseUrl}/api/conektra-clientes/${this.token}`,cliente);
  }

  editarClienteConektra(idCliente:string,cliente:Cliente):Observable<Cliente>{ 
    return this.httpClient.put<Cliente>(`${environment.baseUrl}/api/conektra-clientes/editar-cliente/${this.token}/${idCliente}`,cliente);
  }

  eliminarClienteConektra(idCliente:string):Observable<Cliente>{ 
    return this.httpClient.delete<Cliente>(`${environment.baseUrl}/api/conektra-clientes/eliminar-cliente/${this.token}/${idCliente}`);
  }

}
