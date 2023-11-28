import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddCrearViajeComponent } from 'src/app/shared/components/add-crear-viaje/add-crear-viaje.component';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {

  user:any;
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject (UtilsService);



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
  }



/////

addCrearViaje(){

  this.utilsSvc.presentModal({
    component:AddCrearViajeComponent,
    cssClass : 'add-crear-modal'
  })
}

}
