import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertasComponent } from 'src/app/components/alertas/alertas.component';
import { Cliente } from 'src/app/modelo/clientes/cliente';
import { ClientesConektraService } from 'src/app/servicios/clientes-conektra.service';

@Component({
  selector: 'app-formuario-clientes',
  templateUrl: './formuario-clientes.component.html',
  styleUrls: ['./formuario-clientes.component.css']
})
export class FormularioClientesComponent implements OnInit {
  
  formCliente: FormGroup;
  cliente:Cliente;
  constructor(
    private formBuilder: FormBuilder,
    private clientesConektraServicio:ClientesConektraService,
    private router:Router,
    private dialog: MatDialog
  ) { 
    this.formCliente = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cliente= new Cliente();
  }

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log('Formulario enviado', this.formCliente.value);
    this.cliente=this.formCliente.value;
    console.log('cliente ', this.cliente);
    this.clientesConektraServicio.agregarClienteConektra(this.cliente).subscribe(
      {
        error:error=> {
          this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'error',titulo:'Errór',
            texto:'Errór al agregar al Cliente',
            noMostrarCancelar:true
          }
          });
        },
        complete: ()=> {
          const dialogRef = this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'exito',titulo:'Exitó',
            texto:'El Cliente se ha agregado correctamente',
            noMostrarCancelar:true
          }
          });
          this.router.navigate(['/clientes'])}
      }
    );
  }

}
