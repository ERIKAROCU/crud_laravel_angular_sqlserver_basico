import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Necesario para Angular Material
    MatToolbarModule, // Agrega MatToolbarModule aquí
    ReactiveFormsModule, // Agregar aquí si no es standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }