// navbar.component.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;

  @Output() sidebarToggle: EventEmitter<void> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.getUser().subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
          this.authService.logout(); // Si hay un error, cierra la sesión
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}