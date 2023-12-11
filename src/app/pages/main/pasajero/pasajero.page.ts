import { Component, ElementRef, OnInit ,Renderer2,ViewChild,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

import { GmapsService } from 'src/app/services/gmaps/gmaps.service';


@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject (UtilsService);
  user:any;
  viajes:any[];

  
 @ViewChild('map', {static: true}) mapElementRef: ElementRef;
 googleMaps: any;
 center = { lat:-36.795742 , lng:-73.062716  };
 map: any;




 mapClickListener: any;
 markerClickListener: any;
 markers: any[] = [];

 


    constructor(private router: Router, private route: ActivatedRoute,
    private gmaps: GmapsService,
    private renderer: Renderer2,
    ) { 

    // Obtener el usuario desde el localStorage
    const usuarioJSON = localStorage.getItem('user');
    if (usuarioJSON) {
      this.user = JSON.parse(usuarioJSON);
      }
    }


    modoconductor() {
      const usuarioJSON = localStorage.getItem('user');
     
        this.router.navigate(['main/chofer']);
   }
    

   
   Cerrarsecion() {
    const usuarioJSON = localStorage.getItem('user');
   
      this.router.navigate(['/auth']);
 }


  ngOnInit() {
    this.getViajes();
  }

  
  ngAfterViewInit() {
    this.loadMap();
  }


  getViajes() {
    const path = 'users/$(uid)/viajes'; // Asegúrate de tener el ID de usuario disponible (podría ser this.user.uid u otra fuente)
    
    // Llamar al servicio para obtener la colección de viajes
    this.firebaseSvc.getCollectionData(path).subscribe((viajes: any[]) => {
      this.viajes = viajes;
    });
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
