import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    rol: 'user'
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe(
      (response) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error en el registro');
      }
    );
  }
}
