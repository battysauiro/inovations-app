import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { PlanesConektraService } from 'src/app/servicios/planes-conektra.service';
import { clienteData } from '../clientes/clientes.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dialog-subscribir',
  templateUrl: './dialog-subscribir.component.html',
  styleUrls: ['./dialog-subscribir.component.css']
})
export class DialogSubscribirComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  planes: any;
  plan: any;
  
  nombreColumnas: string[] = ['name', 'email', 'phone', 'acciones'];
  dataSourceDialog: MatTableDataSource<clienteData>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { clientesSeleccionados: any },
    private planesConektraServicio: PlanesConektraService
  ) {
  }


  ngAfterViewInit(): void {
    this.dataSourceDialog.paginator = this.paginator;
    this.dataSourceDialog.sort = this.sort;
  }

  ngOnInit(): void {
    this.obtenerListaPlanes();
    this.dataSourceDialog = new MatTableDataSource(this.data.clientesSeleccionados);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDialog.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDialog.paginator) {
      this.dataSourceDialog.paginator.firstPage();
    }
  }

  obtenerListaPlanes() {
    this.planesConektraServicio.listarPlanesConektra(20, " ", "1", "1").subscribe(
      {
        next: response => {
          this.planes = response.data;
        },
        error: error => console.error(error),
      }

    );
  }

  seleccion(event: MatSelectChange) {
    let valorSeleccionado = event.value;
    this.plan = this.planes.find(plan => plan.id == valorSeleccionado);
  }

  eliminarDeLaLista(fila: any) {
    const idAEliminar = fila.id;
    const indiceAEliminar = this.data.clientesSeleccionados.findIndex(cliente => cliente.id === idAEliminar);
    // Verifica si el elemento con el ID existe en el arreglo
    if (indiceAEliminar !== -1) {
      let clienteAux = this.dataSourceDialog.data;
      clienteAux.splice(indiceAEliminar, 1);
      console.log(clienteAux)
      this.dataSourceDialog.data=clienteAux;

    }
  }

}
