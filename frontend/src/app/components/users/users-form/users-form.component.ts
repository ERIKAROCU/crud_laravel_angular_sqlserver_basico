import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
import { LoaderComponent } from '../../../shared/loader/loader.component';

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
    LoaderComponent,
  ],
})
export class UsersFormComponent {
  userForm: FormGroup;
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<UsersFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]], // AQUI: La contraseña no es requerida en edición
        confirmPassword: [''],
        rol: ['user', [Validators.required]],
        is_active: [true, [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );

    if (this.data) {
      this.isEditMode = true;
      this.isLoading = true;
      this.userForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        rol: this.data.rol,
        is_active: this.data.is_active,
      });

      // AQUI: Eliminamos validación de contraseña en modo edición
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();

      this.isLoading = false;
    }
  }

  // AQUI: Validador para comprobar que las contraseñas coincidan
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordsMismatch: true } : null;
  }

  // AQUI: Método para obtener mensajes de error en los campos
  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) return 'Este campo es obligatorio.';
    if (control?.hasError('minlength')) return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    if (control?.hasError('email')) return 'Ingresa un email válido.';
    if (controlName === 'confirmPassword' && control?.parent?.hasError('passwordsMismatch')) return 'Las contraseñas no coinciden.';
    return '';
  }

  // AQUI: Método para enviar datos del formulario
  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = { ...this.userForm.value };

      if (this.isEditMode && !userData.password) {
        delete userData.password;
        delete userData.confirmPassword;
      }

      this.isLoading = true; // AQUI: Activamos el loader
      if (this.isEditMode && this.data) {
        this.usersService.updateUser(this.data.id, userData).subscribe({
          next: () => {
            this.isLoading = false; // AQUI: Desactivamos el loader
            this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => this.handleError(error, 'Error al actualizar usuario'),
        });
      } else {
        this.usersService.createUser(userData).subscribe({
          next: () => {
            this.isLoading = false; // AQUI: Desactivamos el loader
            this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => this.handleError(error, 'Error al crear usuario'),
        });
      }
    }
  }

  // AQUI: Manejo de errores del backend
  handleError(error: any, defaultMessage: string) {
    this.isLoading = false; // AQUI: Desactivamos el loader en caso de error
    console.error(defaultMessage, error);
    if (error.status === 422) {
      const errorMessage = this.formatValidationErrors(error.error.errors);
      this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
    } else {
      this.snackBar.open(defaultMessage, 'Cerrar', { duration: 3000 });
    }
  }

  // AQUI: Formateo de errores del backend
  private formatValidationErrors(errors: { [key: string]: string[] }): string {
    return Object.keys(errors)
      .map((key) => `${key}: ${errors[key].join(', ')}`)
      .join('\n');
  }

  // AQUI: Método para cerrar el diálogo sin guardar cambios
  onCancel(): void {
    this.dialogRef.close();
  }
}