import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 20;
  progreso2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  // Antigua funcion usada para comunicar evento al HTML del padre
  // actualizar( event: number) {
  //   console.log(event);
  //   this.progreso1 = event;
  // }



}
