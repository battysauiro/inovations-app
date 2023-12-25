import { Component, OnInit } from '@angular/core';
import { ClientesConektraService } from 'src/app/servicios/clientes-conektra.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes:any;
  constructor(public conektraServicio:ClientesConektraService) { }

  ngOnInit(): void {
    this.conektraServicio.listarClientesConektra().subscribe(
      {
        next:response=>this.clientes=response.data,
        error:error=> console.error(error)
      }
      
    );
  }

}
