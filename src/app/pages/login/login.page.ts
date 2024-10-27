import { Component, inject, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule , ReactiveFormsModule]
})
export class LoginPage  {

  loginForm: FormGroup;

  private authFirebase = inject(Auth);

  constructor(private fb: FormBuilder, private auth: Auth, private router:Router , private serviceAuth: AuthServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;

    console.log(email,password)
    this.router.navigate(['/pages/tabs/home']);

  }


  async loginWithGoogle() {
    
    this.serviceAuth.loginWithGoogle().
    then((response) => {
      console.log(response)
      this.router.navigate(['/pages/tabs/home']);
    }).
    catch((error) => {
      console.log(error)
    })



  }


  navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
