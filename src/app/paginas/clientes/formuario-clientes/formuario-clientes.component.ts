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
  banderaActualizar:boolean=false;
  banderaVer:boolean=false;
  titulo:string='Agregar Cliente'
  constructor(
    private formBuilder: FormBuilder,
    private clientesConektraServicio:ClientesConektraService,
    private router:Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { 
    this.generarForm(false);
  }

  ngOnInit(): void {
    this.cliente= new Cliente();
    this.route.params.subscribe(params => {
      const idCliente = params['id'];
      const tipo = params['tipo'];
      if(idCliente && tipo){
        if(tipo=='ver'){
          this.banderaVer=true;
          this.titulo='Cliente solo lectura';
          this.generarForm(true);
        }
        if(tipo=='editar'){
          this.banderaActualizar=true;
          this.titulo='Actualizar Cliente'
          this.generarForm(false);
        }
        this.obtenerCliente(idCliente);
      }   
    });
  }

  generarForm(desactivarInputs){
    this.formCliente = this.formBuilder.group({
      name:  [{value:'',disabled: desactivarInputs}, Validators.required],
      email: [{value:'',disabled: desactivarInputs}, Validators.required],
      phone: [{value:'',disabled: desactivarInputs}, Validators.required]
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
        error: error=> {
          this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'error',titulo:'Errór',
            texto:'Error al obtener al Cliente',
            noMostrarCancelar:true
          }
          });
        }
      }
    );
  }

  agregarCliente(cliente:Cliente){
    this.clientesConektraServicio.agregarClienteConektra(cliente).subscribe(
      {
        error:error=> {
          this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'error',titulo:'Error',
            texto:'Error al agregar al Cliente',
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
          this.router.navigate(['/clientes'])
        }
      }
    );
  }
  editarCliente(idCliente:string,cliente:Cliente){
    this.clientesConektraServicio.editarClienteConektra(idCliente,cliente).subscribe(
      {
        next:response=>{
          this.cliente =response;
          this.formCliente.patchValue({
            name: this.cliente.name,
            email:this.cliente.email,
            phone:this.cliente.phone
          });
        },
        error: error=> {
          this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'error',titulo:'Error',
            texto:'Error al actualizar al cliente.',
            noMostrarCancelar:true
          }
          });
        },
        complete: ()=> {
          const dialogRef = this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'exito',titulo:'Exitó',
            texto:'El cliente se ha actualizado correctamente.',
            noMostrarCancelar:true
          }
          });
          this.router.navigate(['/clientes']);
        }
      }
    );
  }

  onSubmit() {
    let cliente:Cliente=this.formCliente.value;
    if(!this.banderaActualizar){
      const dialogRef = this.dialog.open(AlertasComponent, {
        disableClose:true,
        data: {tipo:'advertencia',titulo:'ATENCIÓN',
        texto:'¿Está seguro de agregar a este cliente?'
      }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.agregarCliente(cliente);
        }
      });  
    }else{
      const dialogRef = this.dialog.open(AlertasComponent, {
        disableClose:true,
        data: {tipo:'advertencia',titulo:'ATENCIÓN',
        texto:'¿Está seguro de actualizar a este cliente?'
      }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.editarCliente(this.cliente.id,cliente);
        }
      }); 
    }
  }

  cancelar(){
    const dialogRef = this.dialog.open(AlertasComponent, {
      disableClose:true,
      data: {tipo:'advertencia',titulo:'ATENCIÓN',
      texto:'¿Está seguro de cancelar el registro?'
    }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/clientes'])
      }
    });
  }

}
