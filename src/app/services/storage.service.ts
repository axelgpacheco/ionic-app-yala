import { Injectable } from '@angular/core';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { selectAuthUser } from '../common/core/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private store: Store) { }

  async addRegistroDocument(data: { tipo: string; monto: string; fecha: Date; description: string }) {
    try {

      const user = await firstValueFrom(this.store.select(selectAuthUser));
      if (!user?.uid) {
        throw new Error('User is not logged in.');
      }

      const documentData = {
        ...data,
        uid: user.uid
      };

      const result = await FirebaseFirestore.addDocument({
        reference: 'registro',
        data: documentData,
      });
      console.log('Documento agregado:', result);
      return result;
    } catch (error) {
      console.error('Error al agregar el documento:', error);
      throw error;
    }
  }
}
