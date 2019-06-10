import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Ajustes } from './ajustes.interface';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

    constructor(@Inject(DOCUMENT) private propDocument ) {
      this.cargarAjustesUsuario();
     }

  guardarAjustesUsuario() {
    // console.log('Guardado en el LocalStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustesUsuario() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string) {
  const url = `assets/css/colors/${tema}.css`;
  this.propDocument.getElementById('tema').setAttribute('href', url);
  this.ajustes.tema = tema;
  this.ajustes.temaUrl = url;
  this.guardarAjustesUsuario();
  }

}
