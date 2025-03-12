import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token);
        this.isLoading = false;
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Credenciales incorrectas', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
