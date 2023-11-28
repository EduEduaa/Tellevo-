import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-crear-viaje',
  templateUrl: './add-crear-viaje.component.html',
  styleUrls: ['./add-crear-viaje.component.scss'],
})
export class AddCrearViajeComponent  implements OnInit {

  @Input() isModal! : boolean;


  utilsSvc = inject(UtilsService);
  


  ngOnInit() {}

  dismissModal(){
    this.utilsSvc.dismissModal();
  }


  
}
