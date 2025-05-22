import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CustomersComponent } from './features/customers/customers.component';

export const routes: Routes = [

    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'clients',
        component: CustomersComponent
    }
];
