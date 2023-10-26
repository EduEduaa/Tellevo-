import { Component, OnInit, inject } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';


import { User } from 'src/app/models/user.model';

//servicios importados //
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  esConductor: boolean = false;
  form = new FormGroup({
    
    email:new FormControl('',[Validators.required,Validators.email]),
   password:new FormControl('',[Validators.required])

  })
  //injecciones de servicios services //
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sinngIN(this.form.value as User).then(res =>{
      
        this.getUserInto(res.user.uid);

      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration:2500,
          color:'danger',
          position:'middle',
          icon:'alert-circle-outline'

        })

      }).finally(() => {
        loading.dismiss();
      })

    }
  
  }



  async getUserInto(uid: string){
    if(this.form.valid  ){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = 'users/$(uid)';
      

      this.firebaseSvc.getDocument(path).then((user:User) =>{
        this.utilsSvc.saveInLocalStorage('user', user);
          
        if (this.esConductor) {
          // Si es conductor 
          this.utilsSvc.routerLink('/main/chofer');
        } else {
          // Si no es conductor
          this.utilsSvc.routerLink('/main/pasajero');
        }
  


        this.form.reset();

        this.utilsSvc.presentToast({
          message: 'Te damos la Bienvenida '+user.name,
          duration:1500,
          color:'success',
          position:'middle',
          icon:'person-circle-outline'
        })

        
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration:2500,
          color:'danger',
          position:'middle',
          icon:'alert-circle-outline'

        })

      }).finally(() => {
        loading.dismiss();
      })

    }
  
  }

  
}
