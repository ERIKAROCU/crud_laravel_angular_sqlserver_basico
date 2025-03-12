import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AppComponent {
  title = 'frontend';

  isLoading = false;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {
    this.loaderService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges(); 
    });
  }
}