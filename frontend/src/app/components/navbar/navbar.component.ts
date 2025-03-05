import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module'; // Usa el módulo compartido

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { }
