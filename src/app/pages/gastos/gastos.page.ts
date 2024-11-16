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
    { id:1 , descripcion: 'Agua', url: './../../../assets/gastos/botella-de-agua.png', type: 'gasto', icon: 'water-outline' },
    { id:2 , descripcion: 'Luz', url: './../../../assets/gastos/luz.png', type: 'gasto', icon: 'sunny-outline' },
    { id:3 , descripcion: 'Comida', url: './../../../assets/gastos/dieta.png', type: 'gasto', icon: 'restaurant-outline' },
    { id:4 ,descripcion: 'Transporte', url: './../../../assets/gastos/transporte.png', type: 'gasto', icon: 'car-outline' },
    { id:5 ,descripcion: 'Ropa', url: './../../../assets/gastos/ropa.png', type: 'gasto', icon: 'shirt-outline' },
    { id:6 ,descripcion: 'Entretenimiento', url: './../../../assets/gastos/entretenimiento.png', type: 'gasto', icon: 'film-outline' },
    { id:7 ,descripcion: 'Salud', url: './../../../assets/gastos/salud.png', type: 'gasto', icon: 'heart-outline' },
    { id:8 ,descripcion: 'Educación', url: './../../../assets/gastos/educacion.png', type: 'gasto', icon: 'school-outline' },
    { id:9 ,descripcion: 'Hogar', url: './../../../assets/gastos/hogar.png', type: 'gasto', icon: 'home-outline' },
    { id:10 ,descripcion: 'Otros', url: './../../../assets/gastos/otros.png', type: 'gasto', icon: 'options-outline' },
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
