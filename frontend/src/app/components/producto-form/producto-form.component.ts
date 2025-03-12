import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ✅ Importado MatSnackBar
import { Producto } from '../../models/producto.model';
import { LoaderComponent } from '../../shared/loader/loader.component';

// 🔹 Validación personalizada: máximo 6 dígitos en la parte entera
export function maxDigitsValidator(maxDigits: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Si el valor es nulo, no hay error
    const value = control.value.toString();
    const [integerPart] = value.split('.');
    
    if (integerPart.length > maxDigits) {
      return { maxDigits: true };
    }
    
    return null;
  };
}

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
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule, // ✅ Importado MatSnackBarModule
    LoaderComponent
  ],
})
export class ProductoFormComponent {
  productoForm: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto | null, isEditMode: boolean }
    ) {
      this.isEditMode = data.isEditMode;
      this.productoForm = this.fb.group({
        nombre: [data.producto ? data.producto.nombre : '', [Validators.required, Validators.minLength(3)]],
        precio: [data.producto ? data.producto.precio : 0, [Validators.required, Validators.min(0), maxDigitsValidator(6)]],
        cantidad: [data.producto ? data.producto.cantidad : 0, [Validators.required, Validators.min(1), maxDigitsValidator(6)]],
      });
    }

    getErrorMessage(field: string): string {
      const control = this.productoForm.get(field);

      if (control?.hasError('required')) return 'Este campo es obligatorio.';
      if (control?.hasError('minlength')) return 'Debe tener al menos 3 caracteres.';
      if (control?.hasError('min')) return 'Debe ser un valor positivo.';
      if (control?.hasError('maxDigits')) return 'Máximo 6 dígitos permitidos en la parte entera.';

      return '';
    }

    onSubmit() {
      this.isLoading = true;  // Activamos el loader al iniciar la acción
      if (this.productoForm.valid) {
        const productoData = {
          ...this.productoForm.value,
          id: this.data.producto?.id
        };
    
        if (this.isEditMode) {
          this.productoService.updateProducto(productoData).subscribe({
            next: () => {
              this.isLoading = false;  // Desactivamos el loader cuando la acción se complete con éxito
              this.snackBar.open('Producto actualizado con éxito!', 'Cerrar', { duration: 3000 });
              this.dialogRef.close();
              this.productoForm.reset();
            },
            error: (error) => {
              this.isLoading = false;  // Desactivamos el loader en caso de error
              console.error('Error al actualizar producto', error);
              this.snackBar.open('Error al actualizar el producto.', 'Cerrar', { duration: 3000 });
            }
          });
        } else {
          this.productoService.addProducto(productoData).subscribe({
            next: () => {
              this.isLoading = false;  // Desactivamos el loader cuando la acción se complete con éxito
              this.snackBar.open('Producto agregado con éxito!', 'Cerrar', { duration: 3000 });
              this.dialogRef.close();
              this.productoForm.reset();
            },
            error: (error) => {
              this.isLoading = false;  // Desactivamos el loader en caso de error
              console.error('Error al agregar producto', error);
              this.snackBar.open('Error al agregar el producto.', 'Cerrar', { duration: 3000 });
            }
          });
        }
      } else {
        this.isLoading = false;  // Si el formulario no es válido, desactivamos el loader
      }
    }
    

  cerrar(): void {
    this.dialogRef.close();
  }
}
