import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { formatDate } from 'src/app/common/core/functions/formatDate';
import { selectAuthUser } from 'src/app/common/core/state/auth/auth.selectors';
import * as AuthActions from '../../common/core/state/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true ,
  imports: [IonicModule ,CommonModule, FormsModule]
})
export class HeaderComponent  implements OnInit {

  @Input() title: string = 'Home';


  urlPhoto: string = '';
  displayName: string = '';

  user$: Observable<any | null>;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private store: Store
  ) {
    this.title = formatDate(new Date());
    addIcons({ library, playCircle, radio, search });
    this.user$ = this.store.select(selectAuthUser);
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.urlPhoto = user.photoUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg';

        this.displayName = user.displayName?.split(' ')[0]
                           || user.email?.split('@')[0]
                           || 'Usuario';
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
