// app.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layout/empty-layout/empty-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersTableComponent } from './components/users/users-table/users-table.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // 🔥 Layout principal
    canActivate: [AuthGuard], // 🔒 Protege las rutas hijas
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'users', component: UsersTableComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Ruta por defecto dentro del layout principal
    ],
  },
  {
    path: '',
    component: EmptyLayoutComponent, // 🔥 Layout vacío
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: '/dashboard' }, // Ruta por defecto para cualquier otra ruta no definida
];