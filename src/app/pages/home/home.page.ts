import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomePage {
  currentDate: string;

  constructor(private actionSheetController: ActionSheetController, private router: Router) {
    this.currentDate = this.formatDate(new Date());

    addIcons({ library, playCircle, radio, search });

  }

  formatDate(date: Date): string {

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones de Usuario',
      buttons: [
        {
          text: 'Ajustes de Usuario',
          icon: 'settings',
          handler: () => {

          },
        },
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
    this.router.navigate(['/login']);
  }

}
