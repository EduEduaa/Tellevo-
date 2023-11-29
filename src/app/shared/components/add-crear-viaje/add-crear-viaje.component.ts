import { Component, Input, OnInit, inject } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';



import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-crear-viaje',
  templateUrl: './add-crear-viaje.component.html',
  styleUrls: ['./add-crear-viaje.component.scss'],
})
export class AddCrearViajeComponent  implements OnInit {

  @Input() isModal! : boolean;

   
    form = new FormGroup({
    
    nombre:new FormControl('',[Validators.required,Validators.minLength(4)]),
    marca:new FormControl('',[Validators.required,Validators.minLength(4)]),
    patente:new FormControl('',[Validators.required,Validators.minLength(4)]),
    capacidad:new FormControl('',[Validators.required,Validators.min(0)]),

  })
  //injecciones de servicios services //
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user= {} as User;




  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

  }

  dismissModal(){
    this.utilsSvc.dismissModal();
  }


 


  async submit(){
    if(this.form.valid){

      let path =  'users/$(uid)/viajes';
      const loading = await this.utilsSvc.loading();
      await loading.present();

      

     // registrando viaje
      this.firebaseSvc.addDocument(path,this.form.value).then(async res =>{

        this.utilsSvc.dismissModal({ success : true});

        this.utilsSvc.presentToast({
          message: 'creado correctamente',
          duration:2500,
          color:'success',
          position:'middle',
          icon:'checkmark-circle-outline'

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



  

