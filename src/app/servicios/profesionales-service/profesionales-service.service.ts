import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ProfesionalSalud } from '../../models/profesionalsalud.model';
import { UsuarioService } from '../usuario-services/usuario.service';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalesServiceService {
  profesionalSalud: ProfesionalSalud;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService, public _subirArchivoService: SubirArchivoService) { }


  // FALTA PROBAR:
  cargarProfesionalesSalud(desde: number = 0) {
    const url = URL_SERVICIOS + '/profesionalsalud/?desdeRegistro=' + desde;
    return this.http.get(url);
  }


  // FALTA PROBAR:
  obtenerProfesionalSalud(id: string) {
    const url = URL_SERVICIOS + '/profesionalsalud/' + id;
    return this.http.get(url);
  }


  // FALTA PROBAR:
  buscarProfesionalSalud(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/profesionalessalud/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.profesionalessalud)
    );
  }

    // FALTA PROBAR:
  actualizarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'profesionalsalud', id )
        .then((resp: any) => {
          this.profesionalSalud.img = resp.profesionalsalud.img;
          Swal.fire({
            title: 'Perfecto!',
            text: 'Imagen actualizada con Éxito!',
            type: 'success',
            confirmButtonText: 'OK'
          });
        })
        .catch(resp => {
        });
  }


    // FALTA PROBAR:
  actualizarProfesionalSalud(profesionalsalud: ProfesionalSalud) {
    let url = URL_SERVICIOS + '/profesionalsalud/' + profesionalsalud._id;
    url += '?token=' + this._usuarioService.tokenUsuarioLog;
    return this.http.put(url, profesionalsalud)
                    .pipe(
                      map((resp: any) => {
                        Swal.fire({
                          title: 'Perfecto!',
                          text: 'Profesional de Salud actualizado con Éxito!',
                          type: 'success',
                          confirmButtonText: 'Entendido'
                        });
                        return true;
                      })
                    );
  }

    // FALTA PROBAR:
  borrarProfesionalSalud(id: string) {
    let url = URL_SERVICIOS + '/profesionalsalud/' + id;
    url += '?token=' + this._usuarioService.tokenUsuarioLog;
    return this.http.delete(url)
          .pipe(
            map( resp => {
              Swal.fire(
              'Borrado!',
              'Profesional de Salud Eliminado correctamente',
              'success'
              );
              return true;
            })
          );
  }



}
