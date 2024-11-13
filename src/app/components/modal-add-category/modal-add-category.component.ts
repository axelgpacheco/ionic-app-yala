import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ModalAddCategoryComponent  {
  @Input() ingreso: any;
  descripcion: string | undefined;
  selectedImage: string | ArrayBuffer | null = null;
  fileToUpload: File | null = null;
  uploadProgress: number = 0;

  constructor(
    private modalController: ModalController,
  ) {}

  data: any = { uid: '', type: '', monto: '', fecha: 0, description: '' };

  

  closeModal() {
    this.modalController.dismiss();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  uploadImage(): void {
    if (this.fileToUpload) {
      const filePath = `categories/${Date.now()}_${this.fileToUpload.name}`;
      console.log(filePath);
      
    } else {
      alert('Please select an image before uploading.');
    }
  }

  guardarCantidad() {
    console.log('Categoria Agregada');
    console.log(this.descripcion);
    console.log('Data:', this.data);
    this.closeModal();
  }
}
