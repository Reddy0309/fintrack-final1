import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HoldingsComponent } from './features/holdings-page/holdings/holdings.component';
import { TransactionsComponent } from './features/transactions/transactions.component';

import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './core/guards/auth.guard'; // Add if needed

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
{ path: 'holdings', component: HoldingsComponent },
 { path: 'transactions', component: TransactionsComponent },
  //{ path: '**', redirectTo: '/login' }, // Optional wildcard
];
