import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';


import { LoadingController, ModalController, ModalOptions,ToastController,ToastOptions} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  loadingCtrl = inject(LoadingController);
  toastCrl = inject(ToastController);
  modalCrl = inject(ModalController);
  router = inject(Router)

  // loading //

  loading(){
    return this.loadingCtrl.create({ spinner : 'crescent'})
  }


//toast (errores de carga)
async presentToast(opts?: ToastOptions) {
  const toast = await this.toastCrl.create(opts);
  toast.present();
}

//  para las rutas  
routerLink(url: string ){
  return this.router.navigateByUrl(url);
}

//  el local estorage 

saveInLocalStorage(key: string, value: any){

  return localStorage.setItem(key,JSON.stringify(value));
}

getFromLocalStorage(key:string){
  return JSON.parse(localStorage.getItem(key));
}
//  modal para crear viaje

async presentModal(opts: ModalOptions) {
  const modal = await this.modalCrl.create(opts);

  await modal.present();

  const {data} = await modal.onWillDismiss();
  if(data)return data;
}



dismissModal(data?:any){
  return this.modalCrl.dismiss(data);
}


}

