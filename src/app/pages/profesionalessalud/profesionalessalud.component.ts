import { Component, OnInit } from '@angular/core';
import { ProfesionalSalud } from '../../models/profesionalsalud.model';
import { ProfesionalesServiceService, ModalUploadService } from '../../servicios/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesionalessalud',
  templateUrl: './profesionalessalud.component.html',
  styles: []
})
export class ProfesionalesSaludComponent implements OnInit {

  profesionalessalud: ProfesionalSalud[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _profesionalesSalud: ProfesionalesServiceService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarProfesionalesSalud();
    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarProfesionalesSalud());
  }

    // FALTA PROBAR:
    mostrarModal(id: string) {
      this._modalUploadService.mostrarModal('profesionalessalud', id);
    }

    // OK: Funciona Perfecto
    cargarProfesionalesSalud() {
      this.cargando = true;
      this._profesionalesSalud.cargarProfesionalesSalud(this.desde)
          .subscribe((resp: any) => {
            this.totalRegistros = resp.totalRegistros;
            this.profesionalessalud = resp.profesionalessalud;
            this.cargando = false;
          });
    }

    // FALTA PROBAR:
    cambiarDesde(valor: number) {
      const desde = this.desde + valor;
      if (desde >= this.totalRegistros) {
        return;
      }
      if (desde < 0) {
        return;
      }
      this.desde += valor;
      this.cargarProfesionalesSalud();
    }

    // FALTA PROBAR:
    // TIENE ERRORES: envia un Bad request devuelta: se debe investigar
    buscarProfesionalSalud( termino: string) {
    if (termino.length <= 0) {
      this.cargarProfesionalesSalud();
      return;
    }
    this.cargando = true;
    this._profesionalesSalud.buscarProfesionalSalud(termino)
      .subscribe((profesionalessalud: ProfesionalSalud[]) => {
        this.profesionalessalud = profesionalessalud;
        this.cargando = false;
      });
  }

    // FALTA PROBAR:
    borrarProfesionalSalud(profesionalsalud: ProfesionalSalud) {
      Swal.fire({
        title: 'Está Seguro?',
        text: 'Desea eliminar al profesional: '  + profesionalsalud.nombre,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórrelo!'
      }).then((data) => {
        if (data.value) {
          this._profesionalesSalud.borrarProfesionalSalud(profesionalsalud._id)
              .subscribe((borrado: boolean) => {
              this.cargarProfesionalesSalud();
              });
        }
      });
    }

    // FALTA PROBAR:
    guardarProfesionalSalud(profesionalsalud: ProfesionalSalud) {
      this._profesionalesSalud.actualizarProfesionalSalud(profesionalsalud)
          .subscribe();
    }


    // FALTA PROBAR:
    async crearProfesionalSaludNuevo(profesionalsalud: ProfesionalSalud) {

      const {value: formValues} = await Swal.fire({
        title: 'Datos Profesional de Salud a crear',
        html:
        '<form id="form1">' +
        '<input name="rut" id="swal-input1" class="swal2-input" placeholder="Rut del profesional">' +
        '<input name="nombre" id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input name="appaterno" id="swal-input1" class="swal2-input" placeholder="Apellido paterno">' +
        '<input name="apmaterno" id="swal-input1" class="swal2-input" placeholder="Apellido materno">' +
        '<input name="email" id="swal-input1" class="swal2-input" placeholder="Correo electrónico">' +
        '<input name="profesion" id="swal-input1" class="swal2-input" placeholder="Profesión">' +
        '</form>',
          // '<input id="nombre_centro" class="swal2-input" placeholder="Nombre centro">' +
          // '<input id="direccion_centro" class="swal2-input" placeholder="Direccion centro">' +
          // '<input id="razon_centro" class="swal2-input" placeholder="Razon Social centro">' +
          // '<input id="estatal_centro" class="swal2-input" placeholder="Estatal o Publico">',
        focusConfirm: false,
        preConfirm: () => {
            return [
              // tslint:disable-next-line: no-string-literal
              document.forms['form1'].elements[0].value,
              // tslint:disable-next-line: no-string-literal
              document.forms['form1'].elements[1].value,
              // tslint:disable-next-line: no-string-literal
              document.forms['form1'].elements[2].value,
              // tslint:disable-next-line: no-string-literal
              document.forms['form1'].elements[3].value,
              // tslint:disable-next-line: no-string-literal
              document.forms['form1'].elements[4].value,
              // tslint:disable-next-line: no-string-literal
              document.forms['form1'].elements[5].value
              // Codigo Original de Swal, no funciono el .value del ById, reemplazado por ByName
              // document.getElementById('rut_centro').value,
              // document.getElementById('nombre_centro').innerText,
              // document.getElementById('direccion_centro').innerText,
              // document.getElementById('razon_centro').innerText,
              // document.getElementById('estatal_centro').innerText
              // document.getElementById('swal-input1').value,
              // document.getElementById('swal-input2').value
            ];
          }
      });
      if (!formValues || formValues.length === 0) {
        return;
      } else {
        console.log('FormValue', formValues);
        Swal.fire(JSON.stringify(formValues));
      }

    }


}
