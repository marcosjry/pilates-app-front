import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CreateCustomerComponent } from './features/create-customer/create-customer.component';

export const routes: Routes = [

    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'clients',
        component: CustomersComponent
    },
    {
        path: 'adicionar-cliente',
        component: CreateCustomerComponent
    }
];
