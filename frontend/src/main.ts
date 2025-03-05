import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Asegúrate de importar las rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes) // ✅ Agrega las rutas aquí
  ]
}).catch(err => console.error(err));
