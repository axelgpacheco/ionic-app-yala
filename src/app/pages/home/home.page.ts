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

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  currentDate: string;
  urlPhoto: string = '';
  displayName: string = '';

  user$: Observable<any | null>;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private store: Store  
  ) {
    this.currentDate = new Date().toISOString();
    addIcons({ library, playCircle, radio, search });
    this.user$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.urlPhoto = user.photoUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg';
        this.displayName = user.displayName?.split(' ')[0] || 'Usuario';
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
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
