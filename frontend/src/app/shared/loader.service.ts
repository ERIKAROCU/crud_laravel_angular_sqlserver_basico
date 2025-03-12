import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  showLoader() {
    console.log('Mostrar loader');
    this.loadingSubject.next(true);
  }

  hideLoader() {
    console.log('Ocultar loader');
    this.loadingSubject.next(false);
  }
}
