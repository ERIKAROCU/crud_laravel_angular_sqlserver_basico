import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { ProductoFormComponent } from '../producto-form/producto-form.component'; // Importa el formulario
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad'];
  isLoading = true;

  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog // Inyecta MatDialog
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
        this.isLoading = false;
      }
    });
  }

  // 🏆 Función para abrir el modal con el formulario
  openDialog(): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px', // Tamaño del modal
    });

    // Después de cerrar el modal, puedes hacer algo si es necesario
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      // Aquí podrías recargar la lista de productos si se añadió uno nuevo
    });
  }
}
