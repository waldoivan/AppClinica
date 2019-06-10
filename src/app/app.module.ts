import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Módulos de la Aplicación
import {FormsModule} from '@angular/forms';
import {PagesModule} from './pages/pages.module';

// Rutas
import { APP_ROUTES } from './app.routes';

// Servicios
import { ServiceModule } from './servicios/service.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
