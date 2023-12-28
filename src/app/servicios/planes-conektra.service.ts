import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../modelo/planes/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanesConektraService {

  constructor(private httpClient:HttpClient) { }

  listarPlanesConektra(limite:number,busqueda:string,siguiente:string,anterior:string):Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-planes/listar-planes/${limite}/${busqueda}/${siguiente}/${anterior}`);
  }

  obtenerPlanConektra(idPlan:string):Observable<any>{ 
    return this.httpClient.get<any>(`${environment.baseUrl}/api/conektra-planes/obtener-plan/${idPlan}`);
  }

  agregarPlanConektra(plan:Plan):Observable<Plan>{
    return this.httpClient.post<Plan>(`${environment.baseUrl}/api/conektra-planes`,plan);
  }

  editarPlanConektra(plan:Plan):Observable<Plan>{ 
    console.log("mi plan ",plan);
    return this.httpClient.put<Plan>(`${environment.baseUrl}/api/conektra-planes/editar-plan`,plan);
  }

  eliminarPlanConektra(idPlan:string):Observable<Plan>{ 
    return this.httpClient.delete<Plan>(`${environment.baseUrl}/api/conektra-planes/eliminar-plan/${idPlan}`);
  }
}
