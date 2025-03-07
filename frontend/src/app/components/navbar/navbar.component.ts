import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module'; // Usa el módulo compartido
import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener el usuario actual
    this.authService.getUser().subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  logout(): void {
    // Llamar al servicio de logout
    this.authService.logout();
  }
}
