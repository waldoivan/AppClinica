import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Guards
import { LoginGuardGuard } from '../servicios/service.index';
import { ProfileComponent } from './profile/profile.component';

const pagesRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
        {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
        {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
        {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'}},
        {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
        {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
        {path: 'account-setting', component: AccountSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
        {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

