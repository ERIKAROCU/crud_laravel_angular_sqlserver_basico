import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list'; // Importa MatListModule
import { MatButtonModule } from '@angular/material/button'; // Ejemplo: Importa MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Ejemplo: Importa MatIconModule
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatToolbarModule,
    MatListModule, 
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    MatTableModule
  ], // Importa los módulos
  exports: [
    MatToolbarModule,
    MatListModule, 
    MatButtonModule,
    MatCardModule, 
    MatIconModule,  
    MatTableModule
  ] // Exporta los módulos
})
export class MaterialModule { }