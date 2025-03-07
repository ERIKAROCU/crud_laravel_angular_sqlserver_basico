import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule, 
    RouterModule // ✅ Necesario para que `<router-outlet>` funcione
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
    this.authService.logout();
  }
}