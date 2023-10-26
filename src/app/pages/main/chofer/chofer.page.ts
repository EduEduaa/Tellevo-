import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.page.html',
  styleUrls: ['./chofer.page.scss'],
})
export class ChoferPage implements OnInit {

  user:any;


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

}
