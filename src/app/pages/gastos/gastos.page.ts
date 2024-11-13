import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalRegistroComponent } from 'src/app/components/modal-registro/modal-registro.component';
import { ModalAddCategoryComponent } from 'src/app/components/modal-add-category/modal-add-category.component';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.page.html',
  styleUrls: ['./gastos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GastosPage{

  gastos: any[] = [
    { descripcion: 'Agua' , url: './../../../assets/gastos/botella-de-agua.png', type: 'gasto'},
    { descripcion: 'Luz', url: './../../../assets/gastos/luz.png' , type: 'gasto'},
    { descripcion: 'Comida' , url: './../../../assets/gastos/dieta.png' , type: 'gasto'},
  ];

  constructor(private modalController: ModalController) {}


  async onCardClick(ingreso: any) {
    const modal = await this.modalController.create({
      component: ModalRegistroComponent,
      componentProps: { ingreso },
    });
    return await modal.present();
  }


  async addNewCategory() {
    const modal = await this.modalController.create({
      component: ModalAddCategoryComponent,
      componentProps: { ingreso: { type: 'gasto'} },
    });
    return await modal.present();
  }

}
