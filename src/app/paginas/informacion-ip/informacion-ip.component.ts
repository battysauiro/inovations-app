import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-informacion-ip',
  templateUrl: './informacion-ip.component.html',
  styleUrls: ['./informacion-ip.component.css']
})
export class InformacionIpComponent implements OnInit, OnDestroy {

  mensaje: string='';
  private subscription: Subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    // Cancela la suscripción al salir del componente para evitar memory leaks
    this.subscription.unsubscribe();
  }

}
