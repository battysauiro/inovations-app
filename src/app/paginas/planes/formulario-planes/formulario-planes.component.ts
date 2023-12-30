import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasComponent } from 'src/app/components/alertas/alertas.component';
import { Plan } from 'src/app/modelo/planes/plan';
import { PlanesConektraService } from 'src/app/servicios/planes-conektra.service';

@Component({
  selector: 'app-formulario-planes',
  templateUrl: './formulario-planes.component.html',
  styleUrls: ['./formulario-planes.component.css']
})
export class FormularioPlanesComponent implements OnInit {

  titulo:string='Agregar Plan'
  formPlan: FormGroup;
  plan:Plan;
  banderaActualizar:boolean=false;
  banderaVer:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private planesConektraServicio:PlanesConektraService,
    private router:Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.generarForm(false);
   }

  ngOnInit(): void {

    this.plan= new Plan();
    this.route.params.subscribe(params => {
      const idPlan = params['id'];
      const tipo = params['tipo'];
      if(idPlan && tipo){
        if(tipo=='ver'){
          this.banderaVer=true;
          this.titulo='Plan solo lectura';
          this.generarForm(true);
        }
        if(tipo=='editar'){
          this.banderaActualizar=true;
          this.titulo='Actualizar Plan'
          this.generarForm(false);
        }
        this.obtenerPlan(idPlan);
      }   
    });
  }

  generarForm(desactivarInputs){
    this.formPlan = this.formBuilder.group({
      name:  [{value:'',disabled: desactivarInputs}, Validators.required],
      amount: [{value:'',disabled: desactivarInputs}, Validators.required],
      frequency: [{value:'',disabled: desactivarInputs}, Validators.required],
      currency: [{value:'MXN',disabled: desactivarInputs}],
      interval: [{value:'week',disabled: desactivarInputs}]
    });

    if(this.banderaActualizar){
      this.formPlan.get('interval').disable();
      this.formPlan.get('frequency').disable();
    }
  }

  obtenerPlan(idPlan){
    this.planesConektraServicio.obtenerPlanConektra(idPlan).subscribe(
      {
        next:response=>{
          this.plan =response;
          this.formPlan.patchValue({
            name: this.plan.name,
            amount:this.plan.amount,
            frequency:this.plan.frequency,
            currency:this.plan.currency,
            interval:this.plan.interval
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

  onSubmit() {
    let plan:Plan=this.formPlan.value;
    plan.id=this.plan.id;
    if(!this.banderaActualizar){
      const dialogRef = this.dialog.open(AlertasComponent, {
        disableClose:true,
        data: {tipo:'advertencia',titulo:'ATENCIÓN',
        texto:'¿Está seguro de agregar este plan?'
      }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.agregarPlan(plan);
        }
      });  
    }else{
      const dialogRef = this.dialog.open(AlertasComponent, {
        disableClose:true,
        data: {tipo:'advertencia',titulo:'ATENCIÓN',
        texto:'¿Está seguro de actualizar este plan?'
      }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.editarPlan(plan);
        }
      }); 
    }
  }

  agregarPlan(plan:Plan){
    this.planesConektraServicio.agregarPlanConektra(plan).subscribe(
      {
        error:error=> {
          this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'error',titulo:'Error',
            texto:'Error al agregar el Plan',
            noMostrarCancelar:true
          }
          });
        },
        complete: ()=> {
          const dialogRef = this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'exito',titulo:'Exitó',
            texto:'El Plan se ha agregado correctamente',
            noMostrarCancelar:true
          }
          });
          this.router.navigate(['/planes'])
        }
      }
    );
  }

  editarPlan(plan:Plan){
    this.planesConektraServicio.editarPlanConektra(plan).subscribe(
      {
        next:response=>{
          this.plan =response;
        },
        error: error=> {
          this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'error',titulo:'Error',
            texto:'Error al actualizar el Plan.',
            noMostrarCancelar:true
          }
          });
        },
        complete: ()=> {
          const dialogRef = this.dialog.open(AlertasComponent, {
            disableClose:true,
            data: {tipo:'exito',titulo:'Exitó',
            texto:'El Plan se ha actualizado correctamente.',
            noMostrarCancelar:true
          }
          });
          this.router.navigate(['/planes']);
        }
      }
    );
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
        this.router.navigate(['/planes'])
      }
    });
  }

}
