import { Component, OnInit } from '@angular/core';
import { ClientesConektraService } from 'src/app/servicios/clientes-conektra.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  customer:any;
  constructor(public conektraServicio:ClientesConektraService) { }

  ngOnInit(): void {
    console.log("entra");
    this.conektraServicio.listarClientesConektra().subscribe(
      response=>{
        this.customer=response.data;
        console.log(response);
      }
    );
  }

}
