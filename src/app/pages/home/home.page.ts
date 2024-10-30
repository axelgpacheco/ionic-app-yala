import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formatDate } from 'src/app/common/core/functions/formatDate';

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

  user: any | null = null;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.currentDate = formatDate(new Date());
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit(): void {


    this.authService.getCurrentUser()
      .then(({ user }) => {
        if (user) {
          this.urlPhoto = user.photoUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg';
          this.displayName = user.displayName?.split(' ')[0] || 'Usuario'
          console.log(user)
        } else {
          console.error('User is null');
        }
        console.log('user ->' + user);
      })
      .catch((error) => {
        console.error('Error obteniendo el usuario:', error);
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
    this.authService.logout();
    this.urlPhoto = '';
    this.displayName = '';
    this.router.navigate(['/login']);
  }

}
