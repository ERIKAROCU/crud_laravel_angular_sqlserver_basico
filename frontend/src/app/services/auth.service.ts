// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `http://${window.location.hostname}:8000/api`;

  constructor(private http: HttpClient, private router: Router) {}

  // Registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Iniciar sesión
  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Obtener información del usuario autenticado
  getUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      this.logout(); // Si no hay token, redirige al login
      return of(null);
    }

    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/me`, { headers }).pipe(
      catchError(() => {
        this.logout(); // Si hay un error, cierra la sesión
        return of(null);
      })
    );
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}