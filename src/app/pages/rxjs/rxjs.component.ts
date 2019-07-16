import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

   this.subscription = this.regresaObservable().pipe(
      // Operador Retry del Observable (se usa con pipe)
      retry(2) // parametro indica el número de intentos
      )
      // Observables tienen 3 Callbacks: 1) al recibir info,
      // 2) cuando hay error y 3) cuando termina (se completa el Observable)
    .subscribe(
      numero => {},
      error => {},
      () => {}
      // numero => console.log('Info de Subscripción ', numero),
      // error => console.log('Error en el Observable: ', error),
      // () => console.log('El Observador terminó ')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador: number = 0;

      const interval = setInterval(() => {
        contador ++;

        const salida = {
          valor: contador
        };
        observer.next(salida);

        // Scaanos este IF para hacer respuestas infinitas y usar unsubscribe
        // if (contador === 3) {
        //   clearInterval(interval);
        //   observer.complete(); // Instrucción cuando se completa el Observable.
        // }
        // if (contador === 2) {
        //   clearInterval(interval);
        //   observer.error('Ha ocurrido un Error en el Observable');
        // }
      }, 1000);
    }). pipe(
      map(resp => resp.valor),
      // El Filter recibe 2 param: valor e index
      filter((valor, index) => {
        if ((valor % 2) === 1) {
          // es impar
          return true;
        } else {
          // es par
          return false;
        }
      })
    );
  }

}
