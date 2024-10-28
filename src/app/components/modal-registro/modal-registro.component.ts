import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { formatDate } from 'src/app/common/core/formatDate';
import { StorageService } from 'src/app/services/storage.service';

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
  constructor(private modalController: ModalController , private storageService:StorageService) {}
 
  data: any = { type: '', monto: '', fecha: 0, description: '' }


  closeModal() {
    this.modalController.dismiss();
  }


  guardarCantidad() {
    
    this.data.type = this.ingreso.type;
    this.data.monto = this.cantidad;
    this.data.fecha = formatDate(new Date());
    this.data.description = this.ingreso.descripcion;
    
    this.storageService.addRegistroDocument(this.data)
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error);
    });

    this.closeModal();
  }

}
