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
    { id: 1, descripcion: 'Salario', url: './../../../assets/ingresos/tarjeta-de-debito.png', type: 'ingreso', icon: 'card-outline' },
    { id: 2, descripcion: 'Freelancer', url: './../../../assets/ingresos/freelance.png', type: 'ingreso', icon: 'briefcase-outline' },
    { id: 3, descripcion: 'Inversiones', url: './../../../assets/ingresos/retorno-de-la-inversion.png', type: 'ingreso', icon: 'chart-outline' },
    { id: 4, descripcion: 'Negocios', url: './../../../assets/ingresos/negocios.png', type: 'ingreso', icon: 'business-outline' },
    { id: 5, descripcion: 'Alquiler', url: './../../../assets/ingresos/alquiler.png', type: 'ingreso', icon: 'home-outline' },
    { id: 6, descripcion: 'Regalos', url: './../../../assets/ingresos/regalos.png', type: 'ingreso', icon: 'gift-outline' },
    { id: 7, descripcion: 'Subsidios', url: './../../../assets/ingresos/subsidio.png', type: 'ingreso', icon: 'cash-outline' },
    { id: 8, descripcion: 'Premios', url: './../../../assets/ingresos/trofeo.png', type: 'ingreso', icon: 'trophy-outline' },
    { id: 9, descripcion: 'Otros', url: './../../../assets/ingresos/otros.png', type: 'ingreso', icon: 'options-outline' },
    { id: 10, descripcion: 'Ventas', url: './../../../assets/ingresos/ventas.png', type: 'ingreso', icon: 'bar-chart-outline' },
  ];

  constructor(private modalController: ModalController) {

  }


  async onCardClick(ingreso: any) {
    const modal = await this.modalController.create({
      component: ModalRegistroComponent,
      componentProps: { ingreso },
    });
    return await modal.present();
  }

}
