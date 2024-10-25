import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class LoginPage  {

  constructor(private router: Router ) {}

  loginWithGoogle() {
    this.router.navigate(['/pages/tabs/home']);
  }


}
