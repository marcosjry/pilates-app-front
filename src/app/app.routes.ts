import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CustomersComponent } from './features/customers/customers.component';
import { CreateCustomerComponent } from './features/create-customer/create-customer.component';
import { CustomerProfileComponent } from './features/customer-profile/customer-profile.component';
import { ProfileDetailsComponent } from './features/customer-profile/components/profile-details/profile-details.component';
import { ProfileContractsComponent } from './features/customer-profile/components/profile-contracts/profile-contracts.component';
import { ProfileClassesComponent } from './features/customer-profile/components/profile-classes/profile-classes.component';
import { ContractsComponent } from './features/contracts/contracts.component';

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
    },
    {
        path: 'cliente/:id', // Rota para o perfil do cliente
        component: CustomerProfileComponent, // O componente pai que contém app-layout e app-profile-layout
        children: [ // Rotas filhas serão renderizadas no router-outlet do ProfileLayoutComponent
        {
            path: '', // Rota padrão (ex: "Perfil")
            component: ProfileDetailsComponent,
        },
        {
            path: 'contratos', // Rota para "Contratos"
            component: ProfileContractsComponent, // Componente para a aba "Contratos"
        },
        {
            path: 'aulas', // Rota para "Aulas"
            component: ProfileClassesComponent, // Componente para a aba "Aulas"
        }
    ]
  },
  {
    path: 'contratos',
    component: ContractsComponent
  }
];
