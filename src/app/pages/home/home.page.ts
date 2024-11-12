import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AuthActions from '../../common/core/state/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { selectAuthUser } from 'src/app/common/core/state/auth/auth.selectors';
import { formatDate } from 'src/app/common/core/functions/formatDate';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class HomePage implements OnInit {
  currentDate: string;
  urlPhoto: string = '';
  displayName: string = '';
  user$: Observable<any | null>;
  documents: any[] = [];
  totalGastos: number = 0;
  totalIngresos: number = 0;
  saldo: number = 0;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private store: Store,
    private firestoreService: StorageService
  ) {
    this.currentDate = formatDate(new Date());
    addIcons({ library, playCircle, radio, search });
    this.user$ = this.store.select(selectAuthUser);
  }

  async ngOnInit() {
    this.user$.subscribe(async user => {
      if (user) {
        this.urlPhoto = user.photoUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg';
        this.displayName = user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Usuario';

        try {
          this.documents = await this.firestoreService.getDocumentsByUid(user.uid);


          this.documents = this.documents.map(doc => {
            const data = doc.data;
            let fecha = data.fecha;


            if (fecha && typeof fecha === 'object' && 'seconds' in fecha && 'nanoseconds' in fecha) {

              fecha = new Date(fecha.seconds * 1000);
            } else if (typeof fecha === 'string' || typeof fecha === 'number') {

              fecha = new Date(fecha);
            }


            if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
              fecha = null;
            }

            return {
              ...doc,
              data: {
                ...data,
                fecha: fecha
              }
            };
          });


          this.totalGastos = this.documents
            .filter(doc => doc.data.type === 'gasto')
            .reduce((sum, doc) => sum + parseFloat(doc.data.monto), 0);

          this.totalIngresos = this.documents
            .filter(doc => doc.data.type === 'ingreso')
            .reduce((sum, doc) => sum + parseFloat(doc.data.monto), 0);

          this.saldo = this.totalIngresos - this.totalGastos;

        } catch (error) {
          console.error('Error fetching documents:', error);
        }

      } else {
        this.urlPhoto = '';
        this.displayName = 'Usuario';
      }
    });
  }




  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de Usuario',
      buttons: [
        {
          text: 'Cerrar Sesión',
          icon: 'log-out',
          handler: () => {
            this.logout();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();

    document.querySelector('ion-content')?.setAttribute('inert', '');
    actionSheet.onDidDismiss().then(() => {
      document.querySelector('ion-content')?.removeAttribute('inert');
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
