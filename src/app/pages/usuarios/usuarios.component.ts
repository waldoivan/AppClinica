import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../servicios/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }


  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe(resp => this.cargarUsuarios());
  }


  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe((resp: any) => {
          this.totalRegistros = resp.totalRegistros;
          this.usuarios = resp.usuarios;
          this.cargando = false;
        });
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    // ARREGLAR: LOS BOTONES SIGUIENTE Y ANTERIOR NO REFRESCAN LOS USUARIOS EN PANTALLA
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }


  buscarUsuarios( termino: string) {
  if (termino.length <= 0) {
    this.cargarUsuarios();
    return;
  }
  this.cargando = true;
  this._usuarioService.buscarUsuarios(termino)
    .subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }


  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuarioLogeado._id) {
      Swal.fire({
        title: 'No puede Borrar al Usuario!',
        text: 'No se puede borrar usted mismo!',
        type: 'error',
        confirmButtonText: 'Entendido'
      });
    }
    Swal.fire({
      title: 'Está Seguro?',
      text: 'Desea eliminar al usuario: '  + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórrelo!'
    }).then((data) => {
      if (data.value) {
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe((borrado: boolean) => {
            this.cargarUsuarios();
            });
      }
    });
  }


  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe();
  }


}
