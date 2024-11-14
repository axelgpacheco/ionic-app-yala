import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true ,
  imports : [IonicModule, FormsModule , ReactiveFormsModule]
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router , private serviceAuth: AuthService) {

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
      const { email, password } = this.registerForm.value;
       this.serviceAuth.createUser(email, password)
       .then((result) => {
          console.log(result);
          this.router.navigate(['/pages/tabs/home']);
       })
       .catch((error) => {
        console.log(error);
       });
    }
    this.registerForm.reset();
  }

  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }


}
