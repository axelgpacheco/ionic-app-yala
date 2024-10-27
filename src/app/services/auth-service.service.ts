import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { createUserWithEmailAndPassword , getRedirectResult, GoogleAuthProvider } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  constructor(private auth: Auth) {}



  async signInWithGoogle() {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
  }

  async signInWithEmailAndPassword(email: string, password: string) {
     const result = await FirebaseAuthentication.signInWithEmailAndPassword({email, password});
    return result.user;
  }

  async createUser(email: string, password: string) {
    try {
      const result = await FirebaseAuthentication.createUserWithEmailAndPassword({email, password});
      console.log("Usuario registrado exitosamente:", result.user);
      return result.user; 
    } catch (error) {
      if ((error as { code: string }).code === 'auth/email-already-in-use') {
        console.error("Este correo electrónico ya está en uso.");
        throw new Error("El usuario ya existe con este correo electrónico.");
      } else if ((error as { code: string }).code === 'auth/invalid-email') {
        console.error("Correo electrónico no válido.");
        throw new Error("El correo electrónico proporcionado no es válido.");
      } else if ((error as { code: string }).code === 'auth/weak-password') {
        console.error("La contraseña es muy débil.");
        throw new Error("La contraseña debe tener al menos 6 caracteres.");
      } else {
        console.error("Error en el registro:", (error as Error).message);
        throw new Error("Hubo un problema al registrar al usuario.");
      }
    }
  }


  async getGoogleRedirectResult() {
    try {
      const result = await getRedirectResult(this.auth);
      if (result) {
        console.log("Inicio de sesión exitoso:", result);
        return result;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener el resultado de la redirección:", error.message);
      } else {
        console.error("Error al obtener el resultado de la redirección:", error);
      }
      throw new Error("Hubo un problema al completar el inicio de sesión con Google.");
    }
    return null; 
  }

 
  async logout(){
    const result = await FirebaseAuthentication.signOut();
    return result;
  }


  async getCurrentUser() {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result;
  }
  
}
