import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesConektraService {

  constructor(public httpClient:HttpClient) { }

  listarClientesConektra():Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-clientes/listar/miurl`);
  }
}
