import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../servicios/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public srvSidebarService: SidebarService) { }

  ngOnInit() {
  }

}
