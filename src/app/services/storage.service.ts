import { Injectable } from '@angular/core';
import { AddCollectionSnapshotListenerCallbackEvent, DocumentData, FirebaseFirestore } from '@capacitor-firebase/firestore';
import { selectAuthUser } from '../common/core/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private store: Store) { }

  async addRegistroDocument(data: { tipo: string; monto: string; fecha: Date; description: string, icon: string }) {
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



  async deleteRegistroDocument(path: string) {
    try {
      const result = await FirebaseFirestore.deleteDocument({
        reference: path
      });
      return result;
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
      throw error;
    }
  }


  async editRegistroDocument(path: string, data: { uid: '', type: '', monto: '', fecha: 0, description: '' }) {

    try {
      const user = await firstValueFrom(this.store.select(selectAuthUser));
      if (!user?.uid) {
        throw new Error('User is not logged in.');
      }
      const documentData = {
        ...data,
        uid: user.uid
      };

      const result = await FirebaseFirestore.updateDocument({
        reference: path,
        data: documentData,
      });
      return result;
    } catch (error) {
      console.error('Error al editar el documento:', error);
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

  async getBetweenDateDocument(startDate:number,endDate:number): Promise<any> {
    try {
      const user = await firstValueFrom(this.store.select(selectAuthUser));
      if (!user?.uid) {
        throw new Error('User is not logged in.');
      }
      const { snapshots } = await FirebaseFirestore.getCollection({
        reference: 'registro',
        compositeFilter: {
          type: 'and',
          queryConstraints: [
            { type: 'where', fieldPath: 'uid', opStr: '==', value: user.uid }
          ],
        },
        queryConstraints: [
          { type: 'orderBy', fieldPath: 'fecha', directionStr: 'desc' },
        ],
      });


      if (!snapshots.length) {
        console.log('No documents found within the specified date range.');
        return [];
      }

      console.log(' Start Date:', startDate);
      console.log(' End Date:', endDate);

     return snapshots
    } catch (error) {
      console.error('Error fetching documents by UID and date range:', error);
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
