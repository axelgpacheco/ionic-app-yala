import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ModalRegistroComponent {
  @Input() ingreso: any;
  monto: number | undefined;

  constructor(
    private modalController: ModalController,
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  data: any = { uid: '', type: '', monto: '', fecha: 0, description: '', icon: '' };

  closeModal() {
    this.modalController.dismiss();
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      animated: true,
      icon: 'alert-outline',
    });
    await toast.present();
  }

  guardarMonto() {
    if (this.monto === null || this.monto === undefined || this.monto <= 0) {
      this.showToast('El monto no puede estar vacío.', 'danger');
      return;
    }

    this.data.uid = this.ingreso.uid;
    this.data.type = this.ingreso.type;
    this.data.monto = this.monto;
    this.data.fecha = Date.now();
    this.data.description = this.ingreso.descripcion;
    this.data.icon = this.ingreso.icon;

    this.storageService.addRegistroDocument(this.data)
      .then(() => {
        this.showToast('Registro guardado .', 'success');
        this.closeModal();
      })
      .catch((error) => {
        console.error('Error al guardar el registro:', error);
        this.showToast('Error al guardar el registro.', 'danger');
      });
  }
}
