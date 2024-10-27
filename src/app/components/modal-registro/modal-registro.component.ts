import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
  standalone: true,
  imports: [IonicModule , CommonModule , FormsModule]
})
export class ModalRegistroComponent {

  @Input() ingreso: any;
  cantidad: number | undefined ;
  constructor(private modalController: ModalController) {}


  closeModal() {
    this.modalController.dismiss();
  }


  guardarCantidad() {
    console.log('Cantidad guardada:', this.cantidad);
    this.closeModal();
  }

}
