import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: '', // Si accedes a la raíz, no hay contenido ni redirección
    component: DashboardComponent, 
    children: [] // Sin contenido aquí
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'productos', // Solo en esta ruta se verá el contenido
    component: ProductosComponent
  },
  {
    path: '**', 
    redirectTo: 'auth'
  }
];
