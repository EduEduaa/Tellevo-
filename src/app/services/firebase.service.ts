import { Injectable, inject } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,sendPasswordResetEmail} from '@angular/fire/auth';
import { User } from '../models/user.model';

// para la base de datos import firestore 
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore ,setDoc,doc,getDoc} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  
  auth =inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  
  
  // AUNTENTIFICACION //

sinngIN(user:User){

  return signInWithEmailAndPassword(getAuth(),user.email,user.password)
}


//// creae usuario ////

sinngUp(user:User){

  return createUserWithEmailAndPassword(getAuth(),user.email,user.password)
}
// actualizar usuario
updateUser(displayName:string){

  return updateProfile(getAuth().currentUser,{displayName})
}


//restablecer contraseña

sendRecoveryEmail(email:string){
  return sendPasswordResetEmail(getAuth(),email);
}

//================ base de datos ============00 


setDocument(path: string, data: any ){
  return setDoc(doc(getFirestore(),path),data);

}

async getDocument(path: string){
  return  (await getDoc(doc(getFirestore(),path))).data();

}





}
