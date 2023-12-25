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

  agregarClienteConektra(cliente:Cliente):Observable<Cliente>{ 
    return this.httpClient.post<Cliente>(`${environment.baseUrl}/api/conektra-clientes`,cliente);
  }
}
