import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';

//servicios importados //
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  esConductor: boolean = false;

  form = new FormGroup({
    uid: new FormControl(''),
   email:new FormControl('',[Validators.required,Validators.email]),
   password:new FormControl('',[Validators.required]),
   name:new FormControl('',[Validators.required,Validators.minLength(4)]),

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

     // registrando usuario
      this.firebaseSvc.sinngUp(this.form.value as User).then(async res =>{

        await this.firebaseSvc.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);


        this.setUserInto(uid);


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



  async setUserInto(uid: string){
    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = 'users/$(uid)';
      delete this.form.value.password;

      this.firebaseSvc.setDocument(path,this.form.value).then(async res =>{

        this.utilsSvc.saveInLocalStorage('user',this.form.value);

        if (this.esConductor) {
          // Si es conductor 
          this.utilsSvc.routerLink('/main/chofer');
        } else {
          // Si no es conductor
          this.utilsSvc.routerLink('/main/pasajero');
        }
        this.form.reset();
        
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
