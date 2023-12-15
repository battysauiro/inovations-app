import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {CdkTreeModule} from '@angular/cdk/tree';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    CdkTreeModule
  ]
})
export class AngularMaterialModule { }
