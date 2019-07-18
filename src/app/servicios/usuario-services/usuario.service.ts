import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Actualizar la Importación al cambiar a Environment.ts
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  usuarioLogeado: Usuario;
  tokenUsuarioLog: string;


  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
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
        Swal.fire({
          title: 'Perfecto!',
          text: `Usuario creado con Éxito!: ${usuario.email}`,
          type: 'success',
          confirmButtonText: 'Entendido'
        });
        return resp.usuario;
    }));
  }

    // DEPURAR: falta completar con el apellido paterno y materno
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.tokenUsuarioLog;
    return this.http.put(url, usuario)
                    .pipe(
                      map((resp: any) => {
                        if (usuario._id === this.usuarioLogeado._id) {
                          const usuarioDB: Usuario = resp.usuario;
                          this.guardarLocalStorage(usuarioDB._id, this.tokenUsuarioLog, usuarioDB);
                        }
                        Swal.fire({
                          title: 'Perfecto!',
                          text: 'Usuario actualizado con Éxito!',
                          type: 'success',
                          confirmButtonText: 'Entendido'
                        });
                        return true;
                      })
                    );
  }

  actualizarImagen(archivo: File, id: string) {
  this._subirArchivoService.subirArchivo(archivo, 'usuarios', id )
      .then((resp: any) => {
        this.usuarioLogeado.img = resp.usuario.img;
        Swal.fire({
          title: 'Perfecto!',
          text: 'Imagen actualizada con Éxito!',
          type: 'success',
          confirmButtonText: 'OK'
        });
        this.guardarLocalStorage(id, this.tokenUsuarioLog, this.usuarioLogeado);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario/?desdeRegistro=' + desde;
    return this.http.get(url); // el return en un servicio ES para avisar al componente el resultado del servicio

  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.usuarios)
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.tokenUsuarioLog;

    return this.http.delete(url)
          .pipe(
            map( resp => {
              Swal.fire(
              'Borrado!',
              'El usuario Eliminado correctamente',
              'success'
              );
              return true;
            })
          );
  }


}
