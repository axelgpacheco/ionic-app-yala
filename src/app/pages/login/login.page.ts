import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service.service';
import * as AuthActions from '../../common/core/state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthState } from 'src/app/common/core/state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage  {

  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serviceAuth: AuthService,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    console.log(store);
  }


  loginWithGoogle() {
    this.serviceAuth.signInWithGoogle()
      .then((result) => {
        if (result) {
          this.store.dispatch(AuthActions.loginSuccess({ user: result }));
          this.router.navigate(['/pages/tabs/home']);
        } else {
          console.log('No user data found');
          this.store.dispatch(AuthActions.loginFailure({ error: 'No user data found' }));
        }
      })
      .catch((error) => {
        console.log(error);
        this.store.dispatch(AuthActions.loginFailure({ error: error.message }));
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  loginWithEmailAndPassword() {
    const { email, password } = this.loginForm.value;


    this.store.dispatch(AuthActions.login({ email, password }));

    this.serviceAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.store.dispatch(AuthActions.loginSuccess({ user: result }));
        this.router.navigate(['/pages/tabs/home']);
      })
      .catch((error) => {
        console.log(error);
        this.store.dispatch(AuthActions.loginFailure({ error: error.message }));
      });

    this.loginForm.reset();
  }

  getToken() {
    this.serviceAuth.getToken().
    then((token) => {
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
