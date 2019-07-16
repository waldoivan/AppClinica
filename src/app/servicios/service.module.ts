import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {UserSettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard} from './service.index';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';

@NgModule({
  declarations: [],
  providers: [
    UserSettingsService,
    SharedService,
    UsuarioService,
    SidebarService,
    LoginGuardGuard,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
