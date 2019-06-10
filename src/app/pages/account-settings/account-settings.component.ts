import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../servicios/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public servAjustes: UserSettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }


// VERSION DEL PROFE
  cambiarColor( tema: string, link: any) {
   this.aplicarCheck( link );
   this.servAjustes.aplicarTema( tema );
  }

  aplicarCheck( link: any ) {
   const selectores: any = document.getElementsByClassName('selector');
   for (const ref of selectores) {
      ref.classList.remove('working');
    }
   link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    let tema = this.servAjustes.ajustes.tema;
    for (const ref of selectores) {
     if (ref.getAttribute('data-theme') === tema) {
      ref.classList.add('working');
      break;
     }
    }
  }

}
