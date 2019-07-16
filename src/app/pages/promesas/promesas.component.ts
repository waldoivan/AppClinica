import { Component, OnInit } from '@angular/core';
import { reject } from 'q';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres()
    .then( mensaje => {} )
    .catch( error => {} );
    // .then( mensaje => console.log('Terminó!!') )
    // .catch( error => console.error('Ocurrió un Error en la Promesa!!', error) );
  }

  ngOnInit() {
  }


  contarTres(): Promise <boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => {
        contador += 1;
        // console.log(contador);
        if ( contador === 3) {
        resolve(true);
        clearInterval(interval);
        }
      }, 1000);
    });
  }

}
