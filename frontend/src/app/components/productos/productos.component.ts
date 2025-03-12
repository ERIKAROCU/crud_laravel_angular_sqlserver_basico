import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { MatDialogRef } from '@angular/material/dialog'; // Asegúrate de importar el dialog para confirmaciones
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensajes de éxito o error
import { LoaderService } from '../../shared/loader.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from '../../shared/loader/loader.component';

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
    MatButtonModule,
    MatDialogModule,
    LoaderComponent
  ]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'cantidad', 'acciones']; // Incluye la columna eliminar
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private productoService: ProductoService,
    private loaderService: LoaderService,
    public dialog: MatDialog, // Inyecta MatDialog
    private snackBar: MatSnackBar // Inyecta MatSnackBar para mostrar mensajes
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.loaderService.showLoader();
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loaderService.hideLoader();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
        this.loaderService.hideLoader();
        this.isLoading = false;
      }
    });
  }

  editProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px',
      data: { producto, isEditMode: true } // Pasa el producto y el modo
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadProductos(); // Recarga la lista después de editar
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '500px',
      data: { producto: null, isEditMode: false } // Pasa null para producto y el modo
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.loadProductos(); // Recarga la lista después de crear
    });
  }

  // 🏆 Función para eliminar un producto
  deleteProducto(producto: Producto): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      this.productoService.deleteProducto(producto.id).subscribe({
        next: () => {
          this.loadProductos(); // Recarga la lista después de eliminar
          this.snackBar.open('Producto eliminado con éxito!', 'Cerrar', { duration: 3000 }); // Muestra un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al eliminar el producto', error);
          this.snackBar.open('Error al eliminar el producto', 'Cerrar', { duration: 3000 }); // Muestra un mensaje de error
        }
      });
    }
  }
}
