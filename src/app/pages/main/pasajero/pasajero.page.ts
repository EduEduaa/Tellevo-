import { Component, OnInit ,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  constructor(private router: Router, private route: ActivatedRoute) { 

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


  getViajes() {
    const path = 'users/$(uid)/viajes'; // Asegúrate de tener el ID de usuario disponible (podría ser this.user.uid u otra fuente)
    
    // Llamar al servicio para obtener la colección de viajes
    this.firebaseSvc.getCollectionData(path).subscribe((viajes: any[]) => {
      this.viajes = viajes;
    });
  }



}
