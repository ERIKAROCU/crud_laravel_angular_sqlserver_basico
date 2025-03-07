import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    RouterModule
  ]
})
export class MainLayoutComponent {}