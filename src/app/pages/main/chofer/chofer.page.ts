import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddCrearViajeComponent } from 'src/app/shared/components/add-crear-viaje/add-crear-viaje.component';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject (UtilsService);
  viajes:any[];

  




  constructor(private router: Router, private route: ActivatedRoute) { 

    // Obtener el usuario desde el localStorage
    const usuarioJSON = localStorage.getItem('user');
    if (usuarioJSON) {
      this.user = JSON.parse(usuarioJSON);
      }
    }


    modopasajero() {
      const usuarioJSON = localStorage.getItem('user');
     
        this.router.navigate(['main/pasajero']);
   
    }

       
   Cerrarsecion() {
    const usuarioJSON = localStorage.getItem('user');
   
      this.router.navigate(['/auth']);
 }


  ngOnInit() {
    this.getViajes();
  }

 user(): User{
  return this.utilsSvc.getFromLocalStorage('user');
}

///// creando viaje apartir del modal 

addCrearViaje(){

  this.utilsSvc.presentModal({
    component:AddCrearViajeComponent,
    cssClass : 'add-crear-modal'
  })
}
//

//ejecuta la funcion cada vez que el usuario entra a la pagina


// obteniendo la colleccion 

getViajes() {
  const path = 'users/$(uid)/viajes'; // Asegúrate de tener el ID de usuario disponible (podría ser this.user.uid u otra fuente)
  
  // Llamar al servicio para obtener la colección de viajes
  this.firebaseSvc.getCollectionData(path).subscribe((viajes: any[]) => {
    this.viajes = viajes;
  });
}

}
