import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() tipo = 'advertencia'; //recibira el tipo de alerta a mostrar 'advertencia', 'error', 'exito'
  mensaje:string="IOI";
  
  constructor(
    public dialogRef: MatDialogRef<AlertasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tipo:string,titulo:string,texto:string,noMostrarAceptar?:boolean,noMostrarCancelar?:boolean}
  ) { }

  ngOnInit(): void {
    switch(this.data.tipo){
      case 'advertencia':
        this.dialogRef.updateSize('32rem');
    }
  }

}
