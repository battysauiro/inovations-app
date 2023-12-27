import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlanesConektraService } from 'src/app/servicios/planes-conektra.service';

export interface planData {
  name:string,
  created_at:string,
  amount:string,
  interval:string
}

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  nombreColumnas: string[] = ['name','created_at','amount','interval','acciones'];
  dataSource: MatTableDataSource<planData>;
  planes:any;
  constructor(private planesConektraServicio:PlanesConektraService) { 
    this.obtenerListaPlanes();
  }

  ngAfterViewInit() {

  }

  obtenerListaPlanes(){
    this.planesConektraServicio.listarPlanesConektra(20," ","1","1").subscribe(
      {
        next:response=>{
          this.planes=response.data;
          console.log(response.data);
          
        },
        error:error=> console.error(error),
        complete:()=>{
          this.dataSource = new MatTableDataSource(this.planes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
      
    );
  }

  eliminarPlan(idPlan:string){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
