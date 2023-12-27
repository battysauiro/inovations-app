import { Component, OnInit } from '@angular/core';
import { PlanesConektraService } from 'src/app/servicios/planes-conektra.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  planes:any;
  constructor(private planesConektraServicio:PlanesConektraService) { }

  ngOnInit(): void {
    this.obtenerListaPlanes();
  }

  obtenerListaPlanes(){
    this.planesConektraServicio.listarPlanesConektra(20," ","1","1").subscribe(
      {
        next:response=>{
          this.planes=response.data;
          console.log(response.data);
        },
        error:error=> console.error(error)
      }
      
    );
  }

  eliminarPlan(idPlan:string){

  }

}
