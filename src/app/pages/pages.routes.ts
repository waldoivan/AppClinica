import { Routes, RouterModule } from '@angular/router';

// Componentes
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

const pagesRoutes: Routes = [
    {path: '', component: PagesComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'progress', component: ProgressComponent},
        {path: 'graficas1', component: Graficas1Component},
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

