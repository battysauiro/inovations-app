import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../modelo/clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesConektraService {

  constructor(public httpClient:HttpClient) { }

  listarClientesConektra():Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-clientes/listar/miurl`);
  }

  obtenerClienteConektra(idCliente:string):Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-clientes/obtener-cliente/${idCliente}`);
  }

  agregarClienteConektra(cliente:Cliente):Observable<Cliente>{ 
    return this.httpClient.post<Cliente>(`${environment.baseUrl}/api/conektra-clientes`,cliente);
  }

  editarClienteConektra(idCliente:string,cliente:Cliente):Observable<Cliente>{ 
    return this.httpClient.put<Cliente>(`${environment.baseUrl}/api/conektra-clientes/editar-cliente/${idCliente}`,cliente);
  }

  eliminarClienteConektra(idCliente:string):Observable<Cliente>{ 
    return this.httpClient.delete<Cliente>(`${environment.baseUrl}/api/conektra-clientes/eliminar-cliente/${idCliente}`);
  }

}
