import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertasComponent } from 'src/app/components/alertas/alertas.component';
import { ClientesConektraService } from 'src/app/servicios/clientes-conektra.service';

export interface clienteData {
  name:string,
  email:string,
  phone:string,
}
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  nombreColumnas: string[] = ['name','email','phone','acciones'];
  clientes:any;
  dataSource: MatTableDataSource<clienteData>;
  constructor(
    private conektraServicio:ClientesConektraService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerListaClientes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerListaClientes(){
    this.conektraServicio.listarClientesConektra().subscribe(
      {
        next:response=>{
          this.clientes=response.data;
        },
        error:error=> console.error(error),
        complete:()=>{
          this.dataSource = new MatTableDataSource(this.clientes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
      
    );
  }

  eliminarCliente(idCliente:string){
    const dialogRef = this.dialog.open(AlertasComponent, {
      disableClose:true,
      data: {tipo:'advertencia',titulo:'ATENCIÓN',
      texto:'¿Está seguro de eliminar el cliente?'
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.conektraServicio.eliminarClienteConektra(idCliente).subscribe(
          {
            next:response=>{
              this.dialog.open(AlertasComponent, {
                disableClose:true,
                data: {tipo:'exito',titulo:'Exitó',
                texto:'El Cliente se ha eliminado correctamente.',
                noMostrarCancelar:true
              }
              });
            },
            error:error=>{
              this.dialog.open(AlertasComponent, {
                disableClose:true,
                data: {tipo:'error',titulo:'Error',
                texto:'Error al eliminar al cliente.',
                noMostrarCancelar:true
              }
              });
            },
            complete:()=>this.obtenerListaClientes()
          }
        );
      }
    });
  }

}
