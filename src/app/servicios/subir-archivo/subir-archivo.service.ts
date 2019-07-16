import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // Hecha en JS PURO - Angular NO tiene para subir archivos
  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest(); // esto es AJAX

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen Subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Falló subir Archivo');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true); // verbo, url y petición asíncrona
      xhr.send(formData);
    });
  }


}

