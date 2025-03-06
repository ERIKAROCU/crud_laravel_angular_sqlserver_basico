import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../models/producto.model';

// 🔹 Validación personalizada: máximo 6 dígitos en la parte entera
export function maxDigitsValidator(maxDigits: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null; // Si el valor es nulo, no hay error
    const value = control.value.toString();
    
    // Dividir en parte entera y decimal
    const [integerPart] = value.split('.');
    
    // Validar solo la parte entera
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
    ReactiveFormsModule
  ],
})
export class ProductoFormComponent {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto | null // Inyectar datos si es edición
  ) {
    this.productoForm = this.fb.group({
      nombre: [this.data ? this.data.nombre : '', [Validators.required, Validators.minLength(3)]],
      precio: [this.data ? this.data.precio : 0, [Validators.required, Validators.min(0), maxDigitsValidator(6)]],
      cantidad: [this.data ? this.data.cantidad : 0, [Validators.required, Validators.min(1), maxDigitsValidator(6)]],
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
    if (this.productoForm.valid) {
      const productoData = {
        ...this.productoForm.value,
        id: this.data?.id
      };

      // Verificar y ajustar el precio y cantidad en caso de ser necesario
      productoData.precio = parseFloat(productoData.precio.toString()); // Asegura que el precio sea decimal
      productoData.cantidad = Math.trunc(productoData.cantidad); // Elimina decimales de cantidad

      if (this.data?.id) {
        this.productoService.updateProducto(productoData).subscribe({
          next: () => {
            alert('Producto actualizado con éxito!');
            this.dialogRef.close();
            this.productoForm.reset();
          },
          error: (error) => console.error('Error al actualizar producto', error)
        });
      } else {
        this.productoService.addProducto(productoData).subscribe({
          next: () => {
            alert('Producto agregado con éxito!');
            this.dialogRef.close();
            this.productoForm.reset();
          },
          error: (error) => console.error('Error al agregar producto', error)
        });
      }
    }
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}
