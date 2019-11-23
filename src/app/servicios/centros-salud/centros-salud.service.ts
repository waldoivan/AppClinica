import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CentroSalud } from '../../models/centrosalud.model';
import { UsuarioService } from '../usuario-services/usuario.service';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class CentrosaludService {
  centroSalud: CentroSalud;


  constructor( public http: HttpClient, public _usuarioService: UsuarioService, public _subirArchivoService: SubirArchivoService) {
  }


  // OK: funciona perfecto
  cargarCentrosSalud(desde: number = 0) {
    const url = URL_SERVICIOS + '/centrosalud/?desdeRegistro=' + desde;
    return this.http.get(url);
  }


  // OK: funciona perfecto
  obtenerCentroSalud(id: string) {
    const url = URL_SERVICIOS + '/centrosalud/' + id;
    return this.http.get(url);
  }


  // OK: funciona perfecto
  buscarCentroSalud(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/centrossalud/' + termino;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.centrossalud)
    );
  }


  // OK: funciona perfecto
  actualizarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'centrossalud', id )
        .then((resp: any) => {
          this.centroSalud.img = resp.centrosalud.img;
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

  // OK: funciona perfecto
  actualizarCentroSalud(centrosalud: CentroSalud) {
    let url = URL_SERVICIOS + '/centrosalud/' + centrosalud._id;
    url += '?token=' + this._usuarioService.tokenUsuarioLog;
    return this.http.put(url, centrosalud)
                    .pipe(
                      map((resp: any) => {
                        Swal.fire({
                          title: 'Perfecto!',
                          text: 'Centro de Salud actualizado con Éxito!',
                          type: 'success',
                          confirmButtonText: 'Entendido'
                        });
                        return true;
                      })
                    );
  }


  // OK: funciona perfecto
  borrarCentroSalud(id: string) {
    let url = URL_SERVICIOS + '/centrosalud/' + id;
    url += '?token=' + this._usuarioService.tokenUsuarioLog;
    return this.http.delete(url)
          .pipe(
            map( resp => {
              Swal.fire(
              'Borrado!',
              'Centro de Salud Eliminado correctamente',
              'success'
              );
              return true;
            })
          );
  }


    // DEPURAR: Cambiar constantes a Environment.ts y Actualizar Importaciones arriba en archivo
    crearCentroSaludNuevo(centrosalud: CentroSalud) {
      const url = URL_SERVICIOS + '/centrosalud' + '?token=' + this._usuarioService.tokenUsuarioLog;
      return this.http.post(url, centrosalud).pipe(
      map((resp: any) => {
          Swal.fire({
            title: 'Perfecto!',
            text: `Centro Salud creado con Éxito!: ${centrosalud.nombrefantasia}`,
            type: 'success',
            confirmButtonText: 'Entendido'
          });
          return resp.centrosalud;
      }));
    }


}

