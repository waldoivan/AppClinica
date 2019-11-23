import { Component, OnInit } from '@angular/core';
import { CentroSalud } from '../../models/centrosalud.model';
import { CentrosaludService } from '../../servicios/service.index';
import { ModalUploadService } from '../../servicios/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centrossalud',
  templateUrl: './centrossalud.component.html',
  styles: []
})
export class CentrosSaludComponent implements OnInit {

  centrossalud: CentroSalud[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(public _centroSaludService: CentrosaludService,
              public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarCentrosSalud();
    this._modalUploadService.notificacion
    .subscribe(resp => this.cargarCentrosSalud());
  }


  // OK: funciona perfecto
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('centrossalud', id);
  }

  // OK: funciona perfecto
  cargarCentrosSalud() {
    this.cargando = true;
    this._centroSaludService.cargarCentrosSalud(this.desde)
        .subscribe((resp: any) => {
          this.totalRegistros = resp.totalRegistros;
          this.centrossalud = resp.centrossalud;
          this.cargando = false;
        });
  }


  // OK: funciona perfecto
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarCentrosSalud();
  }

// TIENE ERRORES: envia un Bad request devuelta: se debe investigar
  buscarCentrosSalud( termino: string) {
    if (termino.length <= 0) {
      this.cargarCentrosSalud();
      return;
    }
    this.cargando = true;
    this._centroSaludService.buscarCentroSalud(termino)
      .subscribe((centros: CentroSalud[]) => {
        this.centrossalud = centros;
        this.cargando = false;
      });
  }

  // OK: funciona perfecto
  borrarCentroSalud(centrosalud: CentroSalud) {
    Swal.fire({
      title: 'Está Seguro?',
      text: 'Desea eliminar al entro de salud: '  + centrosalud.nombrefantasia,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórrelo!'
    }).then((data) => {
      if (data.value) {
        this._centroSaludService.borrarCentroSalud(centrosalud._id)
            .subscribe((borrado: boolean) => {
            this.cargarCentrosSalud();
            });
      }
    });
  }

  // Pendiente de Testear
  guardarCentroSalud(centrosalud: CentroSalud) {
    this._centroSaludService.actualizarCentroSalud(centrosalud)
        .subscribe();
  }


  async crearCentroSaludNuevo(centrosalud: CentroSalud) {

    const {value: formValues} = await Swal.fire({
      title: 'Datos Centro de Salud a crear',
      html:
      '<form id="form1">' +
      '<input name="rut" id="swal-input1" class="swal2-input" placeholder="Rut centro">' +
      '<input name="nombre" id="swal-input1" class="swal2-input" placeholder="Nombre centro">' +
      '<input name="direccion" id="swal-input1" class="swal2-input" placeholder="Dirección centro">' +
      '<input name="razon" id="swal-input1" class="swal2-input" placeholder="Razon social centro">' +
      '<input name="estatal" id="swal-input1" class="swal2-input" placeholder="Público">' +
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
            document.forms['form1'].elements[4].value
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
