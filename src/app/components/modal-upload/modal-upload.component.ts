import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../servicios/subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;


  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {
          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();
        })
        .catch( err => {
          console.log('Error en la carga');
        });
  }


  seleccionImagen(archivo) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Sólo Imágenes!',
        text: 'El archivo seleccionado NO es una imagen',
        type: 'error',
        confirmButtonText: 'Entendido'
      });
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    // JS Puro
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

}
