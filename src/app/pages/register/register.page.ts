import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true ,
  imports : [IonicModule, FormsModule , ReactiveFormsModule]
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.matchPasswords });
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registro exitoso', this.registerForm.value);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
