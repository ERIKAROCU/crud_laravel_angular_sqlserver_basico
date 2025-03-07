// users-form.component.ts
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  standalone: true,
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class UsersFormComponent {
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UsersFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]], // No es requerido en modo edición
      rol: ['user', [Validators.required]],
      is_active: [true, [Validators.required]],
    });

    if (this.data) {
      console.log('Datos del usuario:', this.data); // Verifica que is_active esté presente
      this.isEditMode = true;
    
      this.userForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        rol: this.data.rol,
        is_active: this.data.is_active, // No necesitas convertir is_active
      });
    
      console.log('Valor de is_active en el formulario:', this.userForm.get('is_active')?.value); // Verifica el valor asignado
      this.userForm.get('password')?.clearValidators(); // No requerir contraseña en edición
      this.userForm.get('password')?.updateValueAndValidity(); // Actualizar validaciones
    }
  }

  // Método para obtener mensajes de error
  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }
    if (control?.hasError('email')) {
      return 'Ingresa un email válido.';
    }
    return '';
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      // Si estamos en modo edición y el campo de contraseña está vacío, eliminamos el campo
      if (this.isEditMode && !userData.password) {
        delete userData.password;
      }

      if (this.isEditMode && this.data) {
        // Editar usuario
        this.usersService.updateUser(this.data.id, userData).subscribe({
          next: () => {
            this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al actualizar usuario', error);
            if (error.status === 422) {
              const errorMessage = this.formatValidationErrors(error.error.errors);
              this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
            } else {
              this.snackBar.open('Error al actualizar usuario', 'Cerrar', { duration: 3000 });
            }
          },
        });
      } else {
        // Crear usuario
        this.usersService.createUser(userData).subscribe({
          next: () => {
            this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al crear usuario', error);
            if (error.status === 422) {
              const errorMessage = this.formatValidationErrors(error.error.errors);
              this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
            } else {
              this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
            }
          },
        });
      }
    }
  }

  // Formatear errores de validación del backend
  private formatValidationErrors(errors: { [key: string]: string[] }): string {
    let errorMessage = 'Errores de validación:\n';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorMessage += `${key}: ${errors[key].join(', ')}\n`;
      }
    }
    return errorMessage;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}