import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/service.index';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuarioLogeado;
  }

  ngOnInit() {
  }

  guardarFormulario(usuario: Usuario) {
      // DEPURAR: esta validación debería estar en el Backend
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;

    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe();
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

  cambiarImagen() {
    this._usuarioService.actualizarImagen(this.imagenSubir, this.usuario._id);
  }

}
