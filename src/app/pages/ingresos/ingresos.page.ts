import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
  standalone: true,
  imports: [IonicModule , CommonModule
  ]
})
export class IngresosPage {

  gastos: any[] = [
    { descripcion: 'Compra de alimentos', monto: 50, fecha: new Date() },
    { descripcion: 'Transporte', monto: 15, fecha: new Date() },
    { descripcion: 'Cine', monto: 20, fecha: new Date() }
  ];

  constructor() {}

  agregarGasto() {

    console.log('Agregar Gasto');
  }




}
