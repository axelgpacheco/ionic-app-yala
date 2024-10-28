import { Injectable } from '@angular/core';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async addRegistroDocument(
    data: { tipo: string; monto: string; fecha: Date, description: string }) {
    try {
      const result = await FirebaseFirestore.addDocument({
        reference: 'registro',
        data: data,
      });
      console.log('Documento agregado:', result);
      return result;
    } catch (error) {
      console.error('Error al agregar el documento:', error);
      throw error;
    }
  }
}
