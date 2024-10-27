import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalRegistroComponent } from 'src/app/components/modal-registro/modal-registro.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GastosPage{

  gastos: any[] = [
    { descripcion: 'Agua' , url: './../../../assets/gastos/botella-de-agua.png'},
    { descripcion: 'Luz', url: './../../../assets/gastos/luz.png'},
    { descripcion: 'Comida' , url: './../../../assets/gastos/dieta.png'},
    { descripcion: "Agregar" , url: './../../../assets/plus-1.png'}
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
