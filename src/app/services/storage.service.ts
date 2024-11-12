import { Injectable } from '@angular/core';
import { AddCollectionSnapshotListenerCallbackEvent, DocumentData, FirebaseFirestore } from '@capacitor-firebase/firestore';
import { selectAuthUser } from '../common/core/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';

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
      return result;
    } catch (error) {
      console.error('Error al agregar el documento:', error);
      throw error;
    }
  }

  async getDocumentsByUid(uid: string) {
    try {
      const { snapshots } = await FirebaseFirestore.getCollection({
        reference: 'registro',  
        compositeFilter: {
          type: 'and',
          queryConstraints: [
            {
              type: 'where',
              fieldPath: 'uid',
              opStr: '==',
              value: uid
            }
          ]
        },
        queryConstraints: [
          {
            type: 'limit',
            limit: 100  
          }
        ]
      });
      console.log('Documents retrieved:', snapshots);
      return snapshots;
    } catch (error) {
      console.error('Error fetching documents by UID:', error);
      throw error;
    }
  }

  listenToDocumentsByUid(uid: string): Observable<any[]> {
    return new Observable(observer => {
      FirebaseFirestore.addCollectionSnapshotListener(
        {
          reference: 'registro',
          compositeFilter: {
            type: 'and',
            queryConstraints: [
              {
                type: 'where',
                fieldPath: 'uid',
                opStr: '==',
                value: uid
              }
            ]
          },
          queryConstraints: [
            {
              type: 'limit',
              limit: 100
            }
          ]
        },
        (snapshot: AddCollectionSnapshotListenerCallbackEvent<DocumentData> | null, error: any) => {
          if (error) {
            observer.error(error);
          } else {
            if (snapshot) {
              observer.next(snapshot.snapshots);
            }
          }
        }
      );
    });
  }
}
