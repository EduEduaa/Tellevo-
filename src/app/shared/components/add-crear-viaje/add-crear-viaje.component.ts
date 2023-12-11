import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';



import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GmapsService } from 'src/app/services/gmaps/gmaps.service';

@Component({
  selector: 'app-add-crear-viaje',
  templateUrl: './add-crear-viaje.component.html',
  styleUrls: ['./add-crear-viaje.component.scss'],
})
export class AddCrearViajeComponent  implements OnInit {

  @Input() isModal! : boolean;

   
    form = new FormGroup({
      
    
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
      marca: new FormControl('', [Validators.required, Validators.minLength(4)]),
      patente: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      capacidad: new FormControl('', [Validators.required, Validators.pattern('^[1-4]$')]),

  })
  //injecciones de servicios services //
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  user= {} as User;

  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  googleMaps: any;
  center = { lat:-36.795742 , lng:-73.062716  };
  map: any;
 
 
 
 
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
 
  


  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    ) { 

    // Obtener el usuario desde el localStorage
   
    }


  ngOnInit() {
    this.user = this.utilsSvc.getFromLocalStorage('user');

  }

  ngAfterViewInit() {
    this.loadMap();
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
 

 


  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl, {
        center: location,
        zoom: 16,
      });
      this.renderer.addClass(mapEl, 'visible');

     
    } catch(e) {
      console.log(e);
    }
  }




  }



  

