import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-layout',
  standalone: true,
  templateUrl: './empty-layout.component.html',
  styleUrls: ['./empty-layout.component.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class EmptyLayoutComponent {}