import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Actualizar la Importación al cambiar a Environment.ts
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  usuarioLogeado: Usuario;
  tokenUsuarioLog: string;


  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
   }


  // Guard de Login
  estaLogueado() {
    return (this.tokenUsuarioLog.length > 5 ) ? true : false;
  }

// Cargar del LocalStorage
cargarStorage() {
  if (localStorage.getItem('token')) {
    this.tokenUsuarioLog = localStorage.getItem('token');
    this.usuarioLogeado = JSON.parse(localStorage.getItem('usuario'));
  } else {
    this.tokenUsuarioLog = '';
    this.usuarioLogeado = null;
  }
}

  // Guardar datos en LocalStorage
guardarLocalStorage(id: string, token: string, usuario: Usuario) {
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
  this.usuarioLogeado = usuario;
  this.tokenUsuarioLog = token;
}

 // Login Google
 loginGoogle( token: string) {
  const url = URL_SERVICIOS + '/login/google';
  return this.http.post(url, { token }).pipe(
    map((resp: any) => {
      this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
 }

  // Login Normal
  loginUsuario(usuario: Usuario, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

// Logout
  logOut() {
    this.usuarioLogeado = null;
    this.tokenUsuarioLog = '';
    localStorage.removeItem('usuarioLogeado');
    localStorage.removeItem('tokenUsuarioLog');
    this.router.navigate(['/login']);
  }


  // DEPURAR: Cambiar constantes a Environment.ts y Actualizar Importaciones arriba en archivo
  crearUsuarioNuevo(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
    map((resp: any) => {
        alert('Usuario Creado exitosamente' + usuario.email);
        return resp.usuario;
    }));
  }
}
