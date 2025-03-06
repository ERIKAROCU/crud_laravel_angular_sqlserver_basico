import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(response => {
      localStorage.setItem('token', response.access_token);
      alert('Inicio de sesión exitoso');
    }, error => {
      alert('Error en las credenciales');
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      alert('Sesión cerrada');
    });
  }
}
