import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditModalComponent  {


  @Input() ingreso: any;
  @Input() path: string | undefined;
  monto: number | undefined;
  constructor(private modalController: ModalController, private storageService: StorageService) { }

  data: any = { uid: '', type: '', monto: '', fecha: 0, description: '' }


  closeModal() {
    this.modalController.dismiss();
  }


  editarMonto() {

    this.data = {
      ...this.ingreso,
      monto: this.monto ,
    };

    if (this.path) {
      this.storageService.editRegistroDocument(this.path, this.data)
        .then((response) => {
          console.log('Registro actualizado');
        }).catch((error) => {
          console.error('Error al guardar el registro:', error);
        });
    } else {
      console.error('Path is undefined');
    }

      this.closeModal();

  }


}
