import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  user:any;


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
  }

}
