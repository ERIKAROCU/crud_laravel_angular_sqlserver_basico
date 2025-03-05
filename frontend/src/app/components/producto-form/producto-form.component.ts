import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class ProductoFormComponent {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoFormComponent>
  ) 
  {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  getErrorMessage(field: string): string {
    const control = this.productoForm.get(field);
  
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    } 
    if (control?.hasError('minlength')) {
      return 'Debe tener al menos 3 caracteres.';
    }
    if (control?.hasError('min')) {
      return 'Debe ser un valor positivo.';
    }
    
    return '';
  }
  

  onSubmit() {
    if (this.productoForm.valid) {
      this.productoService.addProducto(this.productoForm.value).subscribe({
        next: () => {
          alert('Producto agregado con éxito!');
          this.dialogRef.close();
          this.productoForm.reset();
        },
        error: (error) => {
          console.error('Error al agregar producto', error);
        },
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
