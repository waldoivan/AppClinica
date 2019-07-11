import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicios/service.index';
import { Usuario } from '../models/usuario.model';

// import swal from 'sweetalert';

// Inicializa los Scripts del Custom.js
declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _UsuarioService: UsuarioService,public router: Router) { }

    sonIguales(campo1: string, campo2: string) {

      return (group: FormGroup) => {

        const pass1 = group.controls[campo1].value;
        const pass2 = group.controls[campo2].value;

        if (pass1 === pass2) {
          return null;
        } else {
            return {
              sonIguales: true
            };
        }


      };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      appaterno: new FormControl(null, [Validators.required]),
      apmaterno: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false),
    }, {validators: this.sonIguales('password', 'password2')});
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
     // swal('Debe aceptar los Términos y Condiciones!', 'Intenta otra vez!', 'warning');
     alert('Debe aceptar los Términos y Condiciones!');
     return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.appaterno,
      this.forma.value.apmaterno,
      this.forma.value.email,
      this.forma.value.password
    );

    this._UsuarioService.crearUsuarioNuevo(usuario)
            .subscribe(resp => {
              // Redirecciona hacia el Login una vez creado el nuevo usuario
              this.router.navigate(['/login']);
            });

  }

}
