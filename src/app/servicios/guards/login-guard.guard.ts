import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario-services/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  canActivate() {

    if (this._usuarioService.estaLogueado()) {
      console.log('Autorizado por el Login Guard');
      return true;
    } else {
      console.log('NO Autorizado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
