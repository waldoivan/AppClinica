import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  @Output() evCambioValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef;


  constructor() {  }


  ngOnInit() {
  }


  emiteCambio(newValue: number) {
    // Solucion Vanilla JS se reemplaza por @ViewChild
    const elemHTML: any = document.getElementsByName('progreso')[0];

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue === 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.evCambioValor.emit(this.progreso);
  }

  cambiarProgreso(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso === 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.evCambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus(); // pone el foco sobre el control
  }


}
