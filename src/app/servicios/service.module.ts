import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {UserSettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard} from './service.index';

@NgModule({
  declarations: [],
  providers: [
    UserSettingsService,
    SharedService,
    UsuarioService,
    SidebarService,
    LoginGuardGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
