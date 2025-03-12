// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HttpClientModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor'; // Importa el interceptor

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    NavbarComponent,
    ProductoFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule, // Agrega HttpClientModule aquí
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, // Registra el interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}