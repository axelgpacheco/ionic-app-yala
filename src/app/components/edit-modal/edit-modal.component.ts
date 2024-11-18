import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditModalComponent {

  @Input() ingreso: any;
  @Input() path: string | undefined;
  monto: number | undefined;
  constructor(private modalController: ModalController, private storageService: StorageService, private toastController: ToastController) { }

  data: any = { uid: '', type: '', icon :'', monto: '', fecha: 0, description: '' };

  closeModal() {
    this.modalController.dismiss();
  }

  async showToast(message: string , color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      animated: true,
      icon: 'happy-outline',
    });
    await toast.present();
  }

  editarMonto() {

    if (this.monto === undefined || this.monto === null || isNaN(this.monto) || this.monto <= 0) {
      this.showToast('Por favor, ingrese un monto válido.', 'danger');
      return;
    }


    this.data = {
      ...this.ingreso,
      monto: this.monto,
    };


    if (this.path) {
      this.storageService.editRegistroDocument(this.path, this.data)
        .then((response) => {
          this.showToast('Monto actualizado', 'warning');
        })
        .catch((error) => {
          this.showToast('Error al actualizar el monto.', 'danger');
          console.error('Error al guardar el registro:', error);
        });
    } else {
      console.error('Path is undefined');
    }

    this.closeModal();
  }



  deleteRegistro() {
    if (this.path) {
      this.storageService.deleteRegistroDocument(this.path)
        .then((response) => {
          console.log(response);
          this.showToast('Registro eliminado', 'warning');
        })
        .catch((error) => {
          this.showToast('Error al eliminar el registro.', 'danger');
          console.error('Error al eliminar el registro:', error);
        });
    } else {
      console.error('Path is undefined');
    }
    this.closeModal();
  }
}
