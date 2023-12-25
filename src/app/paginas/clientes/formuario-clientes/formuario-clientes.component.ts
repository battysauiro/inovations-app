import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  banderaActualizar:boolean=true;
  titulo:string='Agregar Cliente'
  constructor(
    private formBuilder: FormBuilder,
    private clientesConektraServicio:ClientesConektraService,
    private router:Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { 
    this.generarForm();
  }

  ngOnInit(): void {
    this.cliente= new Cliente();
    this.route.params.subscribe(params => {
      const idCliente = params['id'];
      const tipo = params['tipo'];
      if(idCliente && tipo){
        if(tipo=='ver'){
          this.banderaActualizar=false;
          this.titulo='Cliente solo lectura';
          this.generarForm();
        }else{
          this.banderaActualizar=true;
          this.titulo='Actualizar Cliente'
          this.generarForm();
        }
        this.obtenerCliente(idCliente);
      }
  
      
    });
  }

  generarForm(){
    this.formCliente = this.formBuilder.group({
      name:  [{value:'',disabled: !this.banderaActualizar}, Validators.required],
      email: [{value:'',disabled: !this.banderaActualizar}, Validators.required],
      phone: [{value:'',disabled: !this.banderaActualizar}, Validators.required]
    });
  }

  obtenerCliente(idCliente){
    this.clientesConektraServicio.obtenerClienteConektra(idCliente).subscribe(
      {
        next:response=>{
          this.cliente =response;
          this.formCliente.patchValue({
            name: this.cliente.name,
            email:this.cliente.email,
            phone:this.cliente.phone
          });
        },
        error: error=> console.error(error)
      }
    );
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
