import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';


// Módulos de la Aplicación
import { SharedModule } from './shared/shared.module';

// Rutas del Módulo PAGES
import { PAGES_ROUTES } from './pages.routes';

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
        DynamicchartComponent
    ],
    exports: [
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
        DynamicchartComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        ChartsModule,
        CommonModule
    ]
})
export class PagesModule { }
