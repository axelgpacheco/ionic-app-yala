import { Component, inject, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { getRedirectResult } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage  {

  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private serviceAuth: AuthServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;

    console.log(email, password);
    this.router.navigate(['/pages/tabs/home']);
  }

  loginWithGoogle() {
    this.serviceAuth.loginWithGoogle()
    .then((result) => {
      console.log(result);
      this.router.navigate(['/pages/tabs/home']);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
