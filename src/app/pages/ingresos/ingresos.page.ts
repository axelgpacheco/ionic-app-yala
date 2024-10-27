import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalRegistroComponent } from 'src/app/components/modal-registro/modal-registro.component';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
  standalone: true,
  imports: [IonicModule , CommonModule , ModalRegistroComponent
  ]
})
export class IngresosPage {

  ingresos: any[] = [
    { id:1, descripcion: 'Salario' , url: './../../../assets/ingresos/tarjeta-de-debito.png'},
    { i:2, descripcion: 'Inversiones', url: './../../../assets/ingresos/retorno-de-la-inversion.png'},
    { id:3, descripcion: 'Premios' , url: './../../../assets/ingresos/trofeo.png'},
    { id:4, descripcion: "Otros" , url: './../../../assets/ingresos/atencion.png'},
    { id:5 , descripcion: "Agregar" , url: './../../../assets/plus-1.png'}
  ];

  constructor(private modalController: ModalController) {}


  async onCardClick(ingreso: any) {
    const modal = await this.modalController.create({
      component: ModalRegistroComponent,
      componentProps: { ingreso },
    });
    return await modal.present();
  }

}
