import { Injectable } from '@angular/core';
import { Auth, signInWithRedirect } from '@angular/fire/auth';
import { createUserWithEmailAndPassword , GoogleAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  constructor(private auth: Auth) {}


  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email , password)
  }

  loginWithGoogle(){
    return signInWithRedirect(this.auth,new GoogleAuthProvider())
  }

  logout(){
    return this.auth.signOut();
  }
}
