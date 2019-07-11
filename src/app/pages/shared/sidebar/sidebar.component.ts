import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../../servicios/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public srvSidebarService: SidebarService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
