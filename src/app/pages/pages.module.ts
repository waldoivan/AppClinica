import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Módulos de la Aplicación
import { SharedModule } from './shared/shared.module';

// Rutas del Módulo PAGES
import { PAGES_ROUTES } from './pages.routes';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { BarChartComponent } from '../personalizados/barchart/barchart.component';
import { PiechartComponent } from '../personalizados/piechart/piechart.component';
import { LinechartComponent } from '../personalizados/linechart/linechart.component';
import { DonutchartComponent } from '../personalizados/donutchart/donutchart.component';
import { RadarchartComponent } from '../personalizados/radarchart/radarchart.component';
import { PolarchartComponent } from '../personalizados/polarchart/polarchart.component';
import { BubblechartComponent } from '../personalizados/bubblechart/bubblechart.component';
import { ScatterchartComponent } from '../personalizados/scatterchart/scatterchart.component';
import { DynamicchartComponent } from '../personalizados/dynamicchart/dynamicchart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        BarChartComponent,
        PiechartComponent,
        LinechartComponent,
        DonutchartComponent,
        RadarchartComponent,
        PolarchartComponent,
        BubblechartComponent,
        ScatterchartComponent,
        DynamicchartComponent,
        AccountSettingsComponent,
        ProfileComponent,
        PromesasComponent,
        RxjsComponent,
        UsuariosComponent,
        ModalUploadComponent,
        IncrementadorComponent
    ],
    exports: [],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        ChartsModule,
        CommonModule,
        FormsModule,
        PipesModule
    ]
})
export class PagesModule { }
