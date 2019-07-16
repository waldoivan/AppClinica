import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
      let url = URL_SERVICIOS + '/img';

      if (!img) {
        return url + '/usuarios/no-image';
      }
      // DEPURAR: poner este If mas arriba para evitar que cree la variable url
      if (img.indexOf('https') >= 0) {
        return img;
      }


      switch (tipo) {
        case 'usuarios':
          url += '/usuarios/' + img;
          break;

        case 'medicos':
          url += '/medicos/' + img;
          break ;

        case 'centrossalud':
          url += '/centrossalud/' + img;
          break;

        default:
          return url + '/usuarios/noimage';

      }

      return url;
  }

}
