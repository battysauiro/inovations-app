import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertasComponent } from 'src/app/components/alertas/alertas.component';
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
  constructor(
    private planesConektraServicio:PlanesConektraService,
    private dialog: MatDialog) { 
    this.obtenerListaPlanes();
  }

  ngAfterViewInit() {

  }

  obtenerListaPlanes(){
    this.planesConektraServicio.listarPlanesConektra(20," ","1","1").subscribe(
      {
        next:response=>{
          this.planes=response.data;
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
    const dialogRef = this.dialog.open(AlertasComponent, {
      disableClose:true,
      data: {tipo:'advertencia',titulo:'ATENCIÓN',
      texto:'¿Está seguro de eliminar el Plan?'
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.planesConektraServicio.eliminarPlanConektra(idPlan).subscribe(
          {
            next:response=>{
              this.dialog.open(AlertasComponent, {
                disableClose:true,
                data: {tipo:'exito',titulo:'Exitó',
                texto:'El Plan se ha eliminado correctamente.',
                noMostrarCancelar:true
              }
              });
            },
            error:error=>{
              this.dialog.open(AlertasComponent, {
                disableClose:true,
                data: {tipo:'error',titulo:'Error',
                texto:'Error al eliminar el Plan.',
                noMostrarCancelar:true
              }
              });
            },
            complete:()=>this.obtenerListaPlanes()
          }
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
