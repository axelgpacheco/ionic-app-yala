import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private auth: Auth) {}


  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email , password)
  }

}
