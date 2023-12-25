import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/modelo/clientes/cliente';

@Component({
  selector: 'app-formuario-clientes',
  templateUrl: './formuario-clientes.component.html',
  styleUrls: ['./formuario-clientes.component.css']
})
export class FormularioClientesComponent implements OnInit {
  
  formCliente: FormGroup;
  cliente:Cliente;
  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.formCliente = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required]
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
  }

}
