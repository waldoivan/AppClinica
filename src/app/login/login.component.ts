import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../servicios/service.index';
import { Usuario } from '../models/usuario.model';


// Inicializa los Scripts del Custom.js
declare function init_plugins();

// Inicializa constante para Google
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;
  auth2: any;


  constructor(public router: Router, public _usuarioService: UsuarioService) { }


  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.remember = true;
    }
  }

  // Login con cuenta Google
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '205123742713-n2165l27sh54tgod82brivn0ul1ppjem.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }
  // gooleUser es el callback, lo que recibes devuelta de la función
  attachSignin(elementoHtml) {
    this.auth2.attachClickHandler(elementoHtml, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
      .subscribe(() => window.location.href = '#/dashboard');
      // .subscribe(() => this.router.navigate(['/dashboard']));
    });
  }


  // Login Normal con nombre de Usuario y Contraseña
  loginAlSistema(forma: NgForm) {
    if (forma.invalid) {
    return;
    }
    const usuario = new Usuario(null, null, null, forma.value.email, forma.value.password);
    this._usuarioService.loginUsuario(usuario, forma.value.remember)
    .subscribe(() => this.router.navigate(['/dashboard']));
  }

}
