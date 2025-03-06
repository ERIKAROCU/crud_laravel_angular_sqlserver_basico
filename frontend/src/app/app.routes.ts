import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '', // Si accedes a la raíz, no hay contenido ni redirección
    component: DashboardComponent, 
    children: [] // Sin contenido aquí
  },
  {
    path: 'productos', // Solo en esta ruta se verá el contenido
    component: ProductosComponent
  },
  {
    path: '**', 
    redirectTo: 'auth'
  }
];
