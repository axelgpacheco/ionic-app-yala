import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GastosPage{

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
