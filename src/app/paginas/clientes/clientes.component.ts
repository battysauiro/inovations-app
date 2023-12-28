import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertasComponent } from 'src/app/components/alertas/alertas.component';
import { ClientesConektraService } from 'src/app/servicios/clientes-conektra.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:any;
  constructor(
    private conektraServicio:ClientesConektraService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerListaClientes();
  }

  obtenerListaClientes(){
    this.conektraServicio.listarClientesConektra().subscribe(
      {
        next:response=>{
          this.clientes=response.data;
        },
        error:error=> console.error(error)
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
